#include "esp_wifi.h"
#include "esp_system.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_http_server.h"
#include "esp_https_ota.h"
#include "esp_http_client.h"

// Wi-Fi credentials for Station mode
#define STA_SSID      "YourNetworkSSID"
#define STA_PASSWORD  "YourNetworkPassword"

// Access Point credentials
#define AP_SSID       "ESP32-AccessPoint"
#define AP_PASSWORD   "12345678"

// Log tag
static const char *TAG = "Dynamic_HTTPS_OTA";

// HTTP server handle
httpd_handle_t server = NULL;

// Function to perform OTA update
esp_err_t perform_ota(const char *ota_url) {
    ESP_LOGI(TAG, "Starting OTA update from URL: %s", ota_url);

    esp_http_client_config_t ota_client_config = {
        .url = ota_url,
        .cert_pem = NULL, // Add server's root certificate here for secure connections
    };

    esp_err_t ret = esp_https_ota(&ota_client_config);
    if (ret == ESP_OK) {
        ESP_LOGI(TAG, "OTA update completed successfully. Restarting...");
        esp_restart();
    } else {
        ESP_LOGE(TAG, "OTA update failed: %s", esp_err_to_name(ret));
    }
    return ret;
}

// HTTP handler for the /update route
esp_err_t update_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Received OTA update request");

    // Buffer to store the URL passed in the HTTP body
    char url_buffer[256];
    int content_len = req->content_len;

    // Read the URL from the HTTP POST request body
    if (content_len >= sizeof(url_buffer)) {
        ESP_LOGE(TAG, "URL is too long");
        httpd_resp_send_err(req, HTTPD_400_BAD_REQUEST, "URL too long");
        return ESP_FAIL;
    }

    int received = httpd_req_recv(req, url_buffer, content_len);
    if (received <= 0) {
        ESP_LOGE(TAG, "Failed to read URL");
        httpd_resp_send_err(req, HTTPD_400_BAD_REQUEST, "Invalid request");
        return ESP_FAIL;
    }
    url_buffer[received] = '\0'; // Null-terminate the URL string

    ESP_LOGI(TAG, "OTA URL: %s", url_buffer);

    // Perform OTA update
    if (perform_ota(url_buffer) == ESP_OK) {
        httpd_resp_sendstr(req, "OTA update successful. Restarting...");
    } else {
        httpd_resp_send_err(req, HTTPD_500_INTERNAL_SERVER_ERROR, "OTA update failed");
    }

    return ESP_OK;
}

// Function to start the HTTP server
void start_http_server() {
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();

    // Start the HTTP server
    ESP_LOGI(TAG, "Starting HTTP server");
    if (httpd_start(&server, &config) == ESP_OK) {
        // Register the /update URI handler
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

// Initialize Wi-Fi in SoftAP + Station mode
void wifi_init(void) {
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    esp_netif_create_default_wifi_ap();
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    // Configure and start Station mode
    wifi_config_t wifi_sta_config = {
        .sta = {
            .ssid = STA_SSID,
            .password = STA_PASSWORD,
        }
    };
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_sta_config));

    // Configure and start Access Point mode
    wifi_config_t wifi_ap_config = {
        .ap = {
            .ssid = AP_SSID,
            .password = AP_PASSWORD,
            .channel = 1,
            .authmode = WIFI_AUTH_WPA2_PSK,
            .max_connection = 4,
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

    // Initialize Wi-Fi in AP+STA mode
    wifi_init();

    // Start HTTP server for OTA updates
    start_http_server();

    ESP_LOGI(TAG, "HTTP server running");
}
