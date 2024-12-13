#include "esp_wifi.h"
#include "esp_system.h"
#include "esp_log.h"
#include "esp_http_server.h"
#include "esp_ota_ops.h"
#include "nvs_flash.h"

// Network credentials
#define STA_SSID      "YourNetworkSSID"
#define STA_PASSWORD  "YourNetworkPassword"
#define AP_SSID       "ESP32-AccessPoint"
#define AP_PASSWORD   "12345678"

// OTA update endpoint
#define OTA_URL       "/update"

static const char *TAG = "OTA Example";

// HTTP Server URI Handler for the update endpoint
esp_err_t ota_handler(httpd_req_t *req)
{
    ESP_LOGI(TAG, "Handling OTA update");

    // Prepare for OTA update
    esp_ota_handle_t update_handle = 0;
    esp_err_t err = esp_ota_begin(update_handle, ESP_SIZE_UNKNOWN, &update_handle);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "esp_ota_begin failed! %s", esp_err_to_name(err));
        httpd_resp_send_500(req);
        return ESP_FAIL;
    }

    // Write incoming OTA data to flash
    size_t received_data_size = 0;
    char data[1024];
    while (received_data_size < req->content_len) {
        int data_len = httpd_req_recv(req, data, sizeof(data));
        if (data_len <= 0) {
            ESP_LOGE(TAG, "Failed to read data!");
            httpd_resp_send_500(req);
            return ESP_FAIL;
        }

        // Write data to OTA partition
        err = esp_ota_write(update_handle, data, data_len);
        if (err != ESP_OK) {
            ESP_LOGE(TAG, "OTA write failed! %s", esp_err_to_name(err));
            httpd_resp_send_500(req);
            return ESP_FAIL;
        }
        received_data_size += data_len;
    }

    // End the OTA process
    err = esp_ota_end(update_handle);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "OTA end failed! %s", esp_err_to_name(err));
        httpd_resp_send_500(req);
        return ESP_FAIL;
    }

    // Reboot to apply the update
    esp_restart();

    return ESP_OK;
}

// Function to start the HTTP server
esp_err_t start_http_server(void)
{
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    httpd_handle_t server = NULL;

    // Start the HTTP server
    esp_err_t res = httpd_start(&server, &config);
    if (res == ESP_OK) {
        httpd_uri_t ota_uri = {
            .uri       = OTA_URL,
            .method    = HTTP_POST,
            .handler   = ota_handler,
            .user_ctx  = NULL
        };
        httpd_register_uri_handler(server, &ota_uri);
    } else {
        ESP_LOGE(TAG, "Failed to start HTTP server");
    }
    return res;
}

// Function to start the Wi-Fi Station and Access Point
void wifi_init(void)
{
    // Initialize NVS
    ESP_ERROR_CHECK(nvs_flash_init());

    // Configure Station (STA) mode
    wifi_config_t wifi_sta_config = {
        .sta = {
            .ssid = STA_SSID,
            .password = STA_PASSWORD
        }
    };

    // Initialize Wi-Fi
    ESP_ERROR_CHECK(esp_wifi_init(NULL));
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_APSTA));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_sta_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    // Start Access Point (AP) mode
    wifi_config_t wifi_ap_config = {
        .ap = {
            .ssid = AP_SSID,
            .password = AP_PASSWORD,
            .ssid_len = 0,
            .channel = 1,
            .authmode = WIFI_AUTH_WPA2_PSK,
            .max_connection = 4,
            .beacon_interval = 100
        }
    };
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_AP, &wifi_ap_config));
    ESP_ERROR_CHECK(esp_wifi_start());
}

void app_main(void)
{
    ESP_LOGI(TAG, "Starting OTA update server");

    // Initialize Wi-Fi (STA and AP mode)
    wifi_init();

    // Start the HTTP server for handling OTA
    start_http_server();

    ESP_LOGI(TAG, "Server running");
}
