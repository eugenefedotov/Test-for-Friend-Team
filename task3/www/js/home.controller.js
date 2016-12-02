'use strict';

angular
  .module('Friend')
  .controller('HomeCtrl', HomeController);

function HomeController($scope, $rootScope) {
  $scope.$on('$ionicView.enter', function() {
    $rootScope.bodyClass = 'home-screen';
  });
}
