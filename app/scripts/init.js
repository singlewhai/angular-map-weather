var
    // Set hosts so we can detect local, staging, production.
    brand = "Walking Penguins",
    hosts = {
        'localhost:8080'        : 'local',
        'staging.task1.com'     : 'staging',
        'task1.com'             : 'production'
    },
    // Set API servers for local, staging, production.
    server_uris = {
        'local'      : 'localhost:8080',
        'staging'    : 'staging.task1.com',
        'production' : 'task1.com'
    },
    // Set Third party API
    third_uris = {
        'local'     : {
            'map'       : {
                'uri'   : 'https://maps.googleapis.com/maps/api/geocode/json?',
                'key'   : config.map.key
            },
            'weather'   : {
                'uri'   : 'http://api.openweathermap.org/data/2.5/weather?',
                'appid' : config.weather.appid,
                'icon'  : function (icon) { return 'http://openweathermap.org/img/w/' + icon + '.png'; }
            }
        }
    }
    current_environment = false,
    google_map          = '';

// Set the current environment based on detected hostname.
if (hosts.hasOwnProperty(window.location.host)) {
    // This is not a branded dashboard, this is GC local, staging, or production.
    current_environment = hosts[window.location.host];
} 

app_server = '//' + server_uris[current_environment];
google_map  = third_uris[current_environment]['map'];
weather_api = third_uris[current_environment]['weather'];
