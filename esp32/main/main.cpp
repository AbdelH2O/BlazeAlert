#include "esp_wifi.h"
#include "esp_system.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_http_server.h"
#include "esp_ota_ops.h"
#include "esp_http_client.h"

// Wi-Fi credentials for Station mode
#define STA_SSID      "YourNetworkSSID"
#define STA_PASSWORD  "YourNetworkPassword"

// Access Point credentials
#define AP_SSID       "Slave-ESP-AP"
#define AP_PASSWORD   "12345678"

// Log tag
static const char *TAG = "Slave_ESP";

// HTTP server handle
httpd_handle_t server = NULL;

// List of connected devices (to propagate updates)
#define MAX_DEVICES 4
char connected_devices[MAX_DEVICES][16]; // IP addresses of connected ESP devices
int num_connected_devices = 0;

// Function to forward OTA to connected devices
esp_err_t propagate_update(const char *binary, size_t binary_len) {
    ESP_LOGI(TAG, "Propagating OTA update to %d connected devices", num_connected_devices);

    for (int i = 0; i < num_connected_devices; i++) {
        ESP_LOGI(TAG, "Propagating to device %s", connected_devices[i]);

        char url[64];
        snprintf(url, sizeof(url), "http://%s/update", connected_devices[i]);

        esp_http_client_config_t config = {
            .url = url,
            .method = HTTP_METHOD_POST,
        };

        esp_http_client_handle_t client = esp_http_client_init(&config);
        esp_http_client_set_post_field(client, binary, binary_len);

        esp_err_t ret = esp_http_client_perform(client);
        if (ret == ESP_OK) {
            ESP_LOGI(TAG, "Update successful for %s", connected_devices[i]);
        } else {
            ESP_LOGE(TAG, "Update failed for %s: %s", connected_devices[i], esp_err_to_name(ret));
        }

        esp_http_client_cleanup(client);
    }

    return ESP_OK;
}

// OTA handler to receive and write the binary file
esp_err_t update_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Received OTA update request");

    char *binary = malloc(req->content_len);
    if (!binary) {
        ESP_LOGE(TAG, "Failed to allocate memory for binary");
        httpd_resp_send_err(req, HTTPD_500_INTERNAL_SERVER_ERROR, "Memory allocation failed");
        return ESP_FAIL;
    }

    int received = 0, total_received = 0;
    while ((received = httpd_req_recv(req, binary + total_received, req->content_len - total_received)) > 0) {
        total_received += received;
    }

    if (received < 0) {
        ESP_LOGE(TAG, "Failed to receive file");
        free(binary);
        httpd_resp_send_err(req, HTTPD_500_INTERNAL_SERVER_ERROR, "File reception failed");
        return ESP_FAIL;
    }

    ESP_LOGI(TAG, "Received %d bytes of OTA binary", total_received);

    // Apply the OTA update
    const esp_partition_t *update_partition = esp_ota_get_next_update_partition(NULL);
    esp_ota_handle_t ota_handle;

    esp_err_t ret = esp_ota_begin(update_partition, OTA_SIZE_UNKNOWN, &ota_handle);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "esp_ota_begin failed (%s)", esp_err_to_name(ret));
        free(binary);
        httpd_resp_send_err(req, HTTPD_500_INTERNAL_SERVER_ERROR, "OTA begin failed");
        return ESP_FAIL;
    }

    ret = esp_ota_write(ota_handle, binary, total_received);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "esp_ota_write failed (%s)", esp_err_to_name(ret));
        esp_ota_end(ota_handle);
        free(binary);
        httpd_resp_send_err(req, HTTPD_500_INTERNAL_SERVER_ERROR, "OTA write failed");
        return ESP_FAIL;
    }

    esp_ota_end(ota_handle);
    esp_ota_set_boot_partition(update_partition);

    // Propagate the update to connected devices
    propagate_update(binary, total_received);

    free(binary);
    httpd_resp_sendstr(req, "OTA update applied and propagated. Restarting...");

    // Restart to apply the update
    esp_restart();
    return ESP_OK;
}

// Function to discover connected devices
void discover_connected_devices() {
    wifi_sta_list_t wifi_sta_list;
    esp_err_t ret = esp_wifi_ap_get_sta_list(&wifi_sta_list);

    if (ret == ESP_OK) {
        num_connected_devices = wifi_sta_list.num;
        for (int i = 0; i < num_connected_devices; i++) {
            uint8_t *mac = wifi_sta_list.sta[i].mac;
            snprintf(connected_devices[i], sizeof(connected_devices[i]), "192.168.4.%d", mac[5] + 1); // Example IP generation
            ESP_LOGI(TAG, "Discovered device: %s", connected_devices[i]);
        }
    } else {
        ESP_LOGE(TAG, "Failed to get station list: %s", esp_err_to_name(ret));
        num_connected_devices = 0;
    }
}

// Function to start the HTTP server
void start_http_server() {
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();

    ESP_LOGI(TAG, "Starting HTTP server");
    if (httpd_start(&server, &config) == ESP_OK) {
        httpd_uri_t update_uri = {
            .uri       = "/update",
            .method    = HTTP_POST,
            .handler   = update_handler,
            .user_ctx  = NULL
        };
        httpd_register_uri_handler(server, &update_uri);
        ESP_LOGI(TAG, "/update route registered");
    } else {
        ESP_LOGE(TAG, "Failed to start HTTP server");
    }
}

// Initialize Wi-Fi in AP+STA mode
void wifi_init(void) {
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    esp_netif_create_default_wifi_ap();
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    wifi_config_t wifi_sta_config = {
        .sta = {
            .ssid = STA_SSID,
            .password = STA_PASSWORD,
        }
    };
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_sta_config));

    wifi_config_t wifi_ap_config = {
        .ap = {
            .ssid = AP_SSID,
            .password = AP_PASSWORD,
            .channel = 1,
            .authmode = WIFI_AUTH_WPA2_PSK,
            .max_connection = MAX_DEVICES,
            .beacon_interval = 100,
        }
    };
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_AP, &wifi_ap_config));

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_APSTA));
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI(TAG, "Wi-Fi initialized in AP+STA mode");
}

void app_main(void) {
    ESP_LOGI(TAG, "Starting application");

    wifi_init();
    discover_connected_devices();
    start_http_server();

    ESP_LOGI(TAG, "HTTP server running");
}
