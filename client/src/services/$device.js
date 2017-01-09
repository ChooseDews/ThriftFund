angular.module('app').service('$device', function($http, $talk) {
		this.is = false;
		isDevice = false;
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
			this.is = true;
			isDevice = true;
    }


		this.keyboard = {
			hide: function(){
				if(isDevice){
					Keyboard.hide();
				}
			},
			hideBar: function(){
				if(isDevice){
					Keyboard.hideFormAccessoryBar(true);
				}
			},
			showBar: function(){
				if(isDevice){
					Keyboard.hideFormAccessoryBar(false);
				}
			}
		};



});
