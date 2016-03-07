var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Location', ['$resource', function($resource) {
    'use strict';
    return $resource(
        google_map['uri'] + '?lat=:lat&lon=:lng',
        {
            lat: '@lat',
            lng: '@lng'
        },
        {
            get_city: {
                url     : google_map['uri'] + 'latlng=:lat,:lng&key=' + google_map['key'],
                method  : 'GET',
                params  : {
                    lat     : '@lat',
                    lng     : '@lng'
                },
                isArray : false
            },
            get_weather_by_city: {
                url     : weather_api['uri'] + 'q=:city,:country&appid=' + weather_api['appid'],
                method  : 'GET',
                params  : {
                    city     : '@city',
                    country     : '@country'
                }
            },
            get_weather_by_zipcode: {
                url     : weather_api['uri'] + 'zip=:zipcode,:country&appid=' + weather_api['appid'],
                method  : 'GET',
                params  : {
                    zipcode     : '@zipcode',
                    country     : '@country'
                }
            }
        }
    );
}]);

