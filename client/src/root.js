angular.module('app', [
  'ui.router',
 // 'ngSanitize',
  'mui',
 // 'ngTouch',
  'ng-fastclick',
  'infinite-scroll',
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

  .state('new', {
    url: "/create",
    templateUrl: "new/new",
    parent: navigation
  })

  .state('register', {
    url: "/register",
    templateUrl: "register/register",
    parent: navigation
  })

  .state('login', {
    url: "/login",
    templateUrl: "login/login",
    parent: navigation
  })

  .state('wishlist', {
    url: "/wishlist",
    templateUrl: "wishlist/wishlist",
    parent: navigation
  })

  .state('item', {
    url: "/item/:itemId",
    templateUrl: "item/item",
    parent: navigation
  });



})
.controller('rootController', function($scope, $rootScope, $state, $auth, $wishlist) {

  $rootScope.$state = $state;
  $rootScope.$auth = $auth;
  $rootScope.$wishlist = $wishlist;


  $auth.attempt();


$scope.showNav = false;

$scope.toggleNav = function(){
	$scope.showNav = !$scope.showNav;
};

});
