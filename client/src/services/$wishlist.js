angular.module('app').factory('$wishlist', function($http, $talk, $auth){
  return {
    get: function(page){
				var self = this;
        return $talk.get('wishlist').then(function(wishlist){
					self.wishlist = wishlist;
					return wishlist;
				});
    },
    add: function(listing){
      return $talk.get('wishlist/add/'+listing).then(function(user){
				if(user._id == $auth.user._id) $auth.user = user;
				return user;
			});
    },
    remove: function(listing){
			return $talk.get('wishlist/remove/'+listing).then(function(user){
				if(user._id == $auth.user._id) $auth.user = user;
				return user;
			});
    },
		wishlist: {}
  };
});
