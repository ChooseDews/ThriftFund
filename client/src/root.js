angular.module('app', [
  'ui.router',
 // 'ngSanitize',
  'mui',
 // 'ngTouch',
 // 'ng-fastclick',
 // 'angularValidator',
 // 'uiGmapgoogle-maps',
 // 'firebase',
  //'ngAnimate'
]).config(function($stateProvider, $urlRouterProvider) {


  var navigation = {
    name: 'navigation',
    templateUrl: 'navigation/nav'
  }

  $urlRouterProvider.otherwise("/");
  $stateProvider

  .state(navigation)


  .state('home', {
    url: "/",
    templateUrl: "feed/feed",
    parent: navigation
  })

  .state('login', {
    url: "/login",
    templateUrl: "login/login"
  })

  .state('new', {
    url: "/create",
    templateUrl: "new/new",
    parent: navigation
  })  ;



})
.controller('rootController', function($scope, $rootScope, $state) {

  $rootScope.$state = $state;

$scope.showNav = false;

$scope.toggleNav = function(){
	$scope.showNav = !$scope.showNav;
};

});
