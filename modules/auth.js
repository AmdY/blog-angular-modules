(function (windows, angular) {
  'use strict';
  angular.module('amdyAuth', [])
    .factory('UserService', ['$rootScope', '$http', function ($rootScope, $http) {
      var self = {
        config: {
          urlLogin: '/login',
          urlLogout: '/logout',
          urlRedirect: '/'
        },
        isLogged: false,
        user: {},
        run: function (userConfig) {
          angular.extend(this.config, userConfig);
          $rootScope.$broadcast('UserService:run', this);
          $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next.auth && !self.isLogged) {
              next.resolve = null;
              next.redirectTo = self.config.urlRedirect;
              event.preventDefault();
            }
          });
        },
        logout: function () {
          $rootScope.$broadcast('UserService:logout');
          this.clear();
          return $http.get(this.config.urlLogout);
        },
        clear: function () {
          this.isLogged = false;
          this.user = {};
        },
        login: function (data) {
          $rootScope.$broadcast('UserService:login', data);
          return $http.post(this.config.urlLogin, data)
            .success(function (data, status, headers, config) {
              self.isLogged = true;
              self.user = data;
              $rootScope.$broadcast('UserService:login:success', data);
            })
            .error(function (data, status, headers, config) {
              $rootScope.$broadcast('UserService:login:error', data);
            });
        }
      };
      return self;
    }]);
})(window, window.angular)