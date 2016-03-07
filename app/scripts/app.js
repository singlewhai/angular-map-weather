var app = angular.module('app', 
    ['ui.router', 'ngCookies', 'ngMap', 'cgBusy', 'appServices']);

app.server = app_server; // Set the current environment based on detected hostname.

// Configure spinner loader.
app.value('cgBusyDefaults', {
    message:'Loading...',
    backdrop: false,
    delay: 300,
    minDuration: 700,
});

// Attach Basic Authentication and redirect for 401, 404, or 500 response.
app.factory('httpInterceptor', function ($q, $location, $rootScope, $cookieStore) {
    'use strict';
    return {
        request: function (config) {
            config.headers = (config.headers || {});
            //config.headers.user = $cookieStore.get('user');
            return config;
        },
        responseError: function (res) { // Redirect to /login if rejected.
            if (res.status === 400) {
                $location.path('/400');
            } else if (res.status === 401) {
                $rootScope.clearVars();
                $location.path('/');
            } else if (res.status === 404) {
                $location.path('/404');
            } else if (res.status === 500) {
                $location.path('/500');
            }
            return $q.reject(res);
        }
    };
});

app.constant('_',
    window._
);

// Routes
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    'use strict';
    /*
     * Set headers for CORS
     * More info about cross origin resource sharing here: http://enable-cors.org/
     * Make sure server is returning this HTTP header:
     * Access-Control-Allow-Origin: *
    */
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    // Inject authInterceptor.
    $httpProvider.interceptors.push('httpInterceptor');

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('base', {
            abstract: true,
            url: '',
            templateUrl: 'views/base.html'
        })
        .state('home', {
            url: '/home',
            parent: 'base',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
});


// Global vars and functions.
app.run(function ($q, $rootScope, $location, $cookieStore, $window, $document) {
    'use strict';
   
    $rootScope.goHome = function() {
        $location.path('/home');
    }

});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
