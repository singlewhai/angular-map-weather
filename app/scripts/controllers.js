// home
app.controller('homeController', function($scope, $location) {
    'use strict';

    // Redirect already logged in.
    /*$scope.checkAuthen(function(err, result){
        if(!result) return;               
    });
    
    var marker, map;
    $scope.$on('mapInitialized', function(evt, evtMap) {
        map = evtMap;
        marker = map.markers[0];
        console.log(marker.position.lat(), marker.position.lng(), 'marker');
    });*/
});

// Maps
app.controller('mapController', function(NgMap, $scope, $window) {
    
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbjRbBOAgumSEQiOLCDjU3IdGLLIL1blE";
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
    
    var marker, map;
    $scope.$on('mapInitialized', function(evt, evtMap) {
        map = evtMap;
        marker = map.markers[0];
        if(marker.position.lat() != 0 && marker.position.lng() != 0){
            $scope.user.location = [marker.position.lat(), marker.position.lng()];
        }
        console.log(marker.position.lat(), marker.position.lng(), $scope.user, 'marker');
    });
    
    $scope.placeMarker = function(e) {

        /*var marker = new google.maps.Marker({position: e.latLng, map: map});
        $window.alert("position: " + e.latLng);

        map.panTo(e.latLng);*/
    }

    $scope.click = function(event) {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
        console.log(marker.getPosition(),'position');
    }
    
});

