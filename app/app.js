(function (windows, angular) {
  'use strict';
  angular.module('appModule', [
    'ngRoute',
    'amdyAuth'
  ]).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/', {controller: 'IndexController', templateUrl: '/app/_index.html'})
      .when('/public', {controller: 'PublicController', templateUrl: '/app/_public.html'})
      .when('/admin', {controller: 'AdminController', templateUrl: '/app/_admin.html', auth: true})
      .otherwise({redirectTo: '/'});
  }]).run(['UserService', '$rootScope', function (UserService, $rootScope) {
    $rootScope.$on('UserService:run', function (e, data) {
      console.info('UserService:run', data);
    });
    $rootScope.$on('UserService:login', function (e, data) {
      console.info('UserService:login', data);
    });
    $rootScope.$on('UserService:login:success', function (e, data) {
      console.info('UserService:login:success', data);
    });
    $rootScope.$on('UserService:login:error', function (e, data) {
      console.info('UserService:login:error', data);
    });
    $rootScope.$on('UserService:logout', function (e, data) {
      console.info('UserService:logout', data);
    });
    UserService.run({urlLogin: 'login.json', urlLogout: "login.json"});
  }]).controller('MainController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
    $scope.userService = UserService;
    $scope.logout = function () {
      UserService.logout();
      $location.path('/');
    }
  }]).controller('IndexController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.login = '';
    $scope.password = '';
    $scope.userService = UserService;
    $scope.doLogin = function () {
      UserService.login({login: $scope.login, password: $scope.password});
    }
  }]).controller('PublicController', [function () {
  }]).controller('AdminController', [function () {
  }])
  ;
})(window, window.angular);
