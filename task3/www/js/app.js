'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Friend', ['ionic'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    /*$rootScope.$on('$stateChangeSuccess', function () {
      if ($state.current.name == 'app.home') {
        $rootScope.bodyClass = 'home-screen';
      } else if($state.current.name == 'app.plugins') {
        $rootScope.bodyClass = 'plugins-screen';
      }
    });*/

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl : 'templates/home.html',
          controller : 'HomeCtrl'
        }
      }
    })

    .state('app.plugins', {
      url: '/plugins',
      views: {
        'menuContent' : {
          templateUrl : 'templates/plugins.html',
          controller : 'PluginsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/home');
});
