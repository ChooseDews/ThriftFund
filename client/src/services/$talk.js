angular.module('app').factory('$talk', function($http, $state){
    var apiUrl = 'http://localhost:3000/api/';
  if(localStorage.apiUrl){
    apiUrl = localStorage.apiUrl;
  }
  var errorHandler = function(response){
     if(response.status === 401 && !$state.is('login') && !$state.is('register')){
       //if(localStorage.token) localStorage.removeItem('token');
       return $state.go('login');
     }
     return response;
  };

  var inputHandler = function(response){
    return response.data;
  }

  return {
    get: function(url, headers){
      if(!headers){
        headers = {};
      }

      if(localStorage.token) headers["x-access-token"] = localStorage.token;
      headers.withCredentials = true;
      console.log(apiUrl+url);
      return $http.get(apiUrl+url, {headers: headers}).catch(errorHandler).then(inputHandler)
    },

    post: function(url, body, headers){
      if(!headers){
        headers = {};
      }
      if(localStorage.token) headers["x-access-token"] = localStorage.token;
      headers.withCredentials = true;
      console.log(apiUrl+url);
      return $http.post(apiUrl+url, body, {headers: headers}).catch(errorHandler).then(inputHandler)
    }
  };
});
