angular.module('app').factory('$listing', function($http, $talk){
  return {
    list: function(page){
      if(page){
        return $talk.get('listing?p='+page);
      }else{
        return $talk.get('listing');
      }
    },
    get: function(id){
      return $talk.get('listing/'+id);
    },
    create: function(object){
      return $talk.post('listing', object);
    },
    comment: function(id, comment){
      return $talk.post('listing/comment', {
        itemId: id,
        comment: comment
      })
    }
  };
});
