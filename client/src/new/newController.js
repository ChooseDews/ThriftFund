angular.module('app').controller('newController', function($scope, $listing, $timeout, $state) {

  $scope.item = {
    condition: "Gently Used"
  };

  $scope.LoadCrop = function(){
    $timeout(function(){
      $('#image').cropper({
          aspectRatio: 1 / 1
        });
    }, 10)

  };




  $scope.initUpload = function(){
    $timeout(function(){
      $("#fileInput").click();
    });
  };

  $scope.submit = function(item){
    item.image = $('#image').cropper('getCroppedCanvas', {
    width: 800,
    height: 800,
    fillColor: '#FFFFFF'
  }).toDataURL('image/jpeg');;
    $listing.create(item).then(function(data){
      console.log(data);
      $state.go('item', {itemId: data._id})
    })
  };


}).directive("fileread", [function () {
    return {
        scope: {
            fileread: "=",
            init: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.init()
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
