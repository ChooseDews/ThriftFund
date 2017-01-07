angular.module('app').factory('$listing', function($http, $talk){
  return {
    list: function(page){
      return $talk.get('listing');
    },
    get: function(id){
      return $talk.get('listing/'+id);
    },
    create: function(object){
      return $talk.post('listing', object);
    }
  };
});
