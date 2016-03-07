// home
app.controller('homeController', function(NgMap, $scope, $window, Location) {
    'use strict';

    $scope.current_location = {
        'visible'   : false,
        'title'     : '',
        'content'   : '',
        'icon'      : '',
        'location'  : 'current-location'
    }
   
    $scope.location = {};

    $scope.$on('mapInitialized', function(evt, evtMap) {
        $scope.map = evtMap;

        if(!!navigator.geolocation) {
            // Support location
            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_config);
        } else {
            // No support location
            alert('this browser not support share location');
        }
    });   

    var getCityName = function(address){
        var location = {};
        $.each(address, function (i, address_component) {

            if (address_component.types[0] === "route"){
                // Route
                location.route = address_component.long_name;
            }

            if (address_component.types[0] === "locality"){
                // Town
                location.city = address_component.long_name;
            }

            if (address_component.types[0] === "country"){ 
                // Country
                location.country = address_component.short_name;
            }

            if (address_component.types[0] === "postal_code_prefix"){ 
                // Zipcode 
                location.zipcode= address_component.long_name;
            }

            if (address_component.types[0] === "street_number"){ 
                // Street
                location.street = address_component.long_name;
            }
            //return false; // break the loop   
        });
        location.text = location.city + ', ' + location.country;
        return location;
    }
    
    var geo_success = function (position) {
        GetCity({
            'lat' : position.coords.latitude,
            'lng' : position.coords.longitude
        });
    }

    var geo_error = function (err) {
        if (err.code == err.PERMISSION_DENIED)
            alertMessage("Permission denied");
        if (err.code == err.POSITION_UNAVAILABLE)
            alertMessage("Position unavailable");
        if (err.code == err.TIMEOUT)
            alertMessage("Time out");
    }
    
    var geo_config = {
        enableHighAccuracy  : true, 
        timeout             : 5000,
        maxAge              : 180000
    }

    var GetCity = function (position) {
        $scope.load = Location.get_city({
                lat: position.lat,
                lng: position.lng
            }, {},
            function (data) {
                //success 
                $scope.location = getCityName(data.results[0].address_components);
                $scope.GetWeather();
            },
            function (err) {
                alertMessage(err);
            }
        );
    }

    var setMarker = function (data) {
        if(data.cod !== '404'){
            $scope.weather = data;
            $scope.current_location = {
                'visible'   : true,
                'title'     : 'The weather here!', 
                'content'   : $scope.location.text,
                'icon'      : weather_api['icon'](data.weather[0].icon),
                'location'  : data.coord.lat + ',' + data.coord.lon
            }
            $scope.map.setCenter({'lat': data.coord.lat, 'lng': data.coord.lon});
            alertMessage(data.weather[0].description, 'info');
        }else{
            alertMessage(data.message); 
        }
        $scope.busy = false;
    }

    $scope.GetWeather = function(){
        $scope.busy = true;
        if($scope.location){
            if($scope.location.zipcode){
                $scope.load = Location.get_weather_by_city({
                        zipcode: $scope.location.zipcode,
                        country: $scope.location.country
                    }, {},
                    function (data) {
                        //success 
                        setMarker(data);
                    },
                    function (err) {
                        alertMessage(err);
                        $scope.busy = false;
                    }
                );
   
            }else if($scope.location.city){
                $scope.load = Location.get_weather_by_city({
                        city: $scope.location.city,
                        country: $scope.location.country
                    }, {},
                    function (data) {
                        //success 
                        setMarker(data);
                    },
                    function (err) {
                        alertMessage(err);
                        $scope.busy = false;
                    }
                );
            }else{
                alertMessage('Please input country with zipcode or city', 'warning');
            }
        }
    }

});

