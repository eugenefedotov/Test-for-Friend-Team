angular
  .module('Friend')
  .controller('PluginsCtrl', PluginsController);

function PluginsController($scope, $rootScope) {
  $scope.$on('$ionicView.enter', function() {
    $rootScope.bodyClass = 'plugins-screen';
  });
}
