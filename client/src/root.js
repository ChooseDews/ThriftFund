angular.module('app', [
  'ui.router',
 // 'ngSanitize',
  'mui',
 // 'ngTouch',
  'ng-fastclick',
  'infinite-scroll',
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
    url: "/login?last",
    templateUrl: "login/login",
    parent: navigation
  })

  .state('about', {
    url: "/about",
    templateUrl: "about/about",
    parent: navigation
  })

  .state('wishlist', {
    url: "/wishlist",
    templateUrl: "wishlist/wishlist",
    parent: navigation
  })

  .state('profane', {
    url: "/profane",
    templateUrl: "profane/profane",
    parent: navigation
  })

  .state('item', {
    url: "/item/:itemId",
    templateUrl: "item/item",
    parent: navigation
  });



})
.controller('rootController', function($scope, $rootScope, $state, $auth, $wishlist, $device) {

  $rootScope.$state = $state;
  $rootScope.$auth = $auth;
  $rootScope.$wishlist = $wishlist;


  $auth.attempt();


$scope.showNav = false;

$scope.toggleNav = function(){
	$scope.showNav = !$scope.showNav;
};

$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
    $rootScope.previousStateParams = fromParams;
    $rootScope.currentStateParams = toParams;
});

$rootScope.back = function(){
  $state.go($rootScope.previousState, $rootScope.previousStateParams);
}


});
