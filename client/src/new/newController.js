angular.module('app').controller('newController', function($scope, $listing) {

  cropped = $('#image').cropper({
    aspectRatio: 1 / 1
  });

  console.log(cropped)

  $scope.item = {
    condition: "Gently Used"
  };

  $scope.submit = function(item){
    item.image = $('#image').cropper('getCroppedCanvas', {
    width: 800,
    height: 800,
    fillColor: '#FFFFFF'
  }).toDataURL('image/jpeg');;
    $listing.create(item).then(function(data){
      console.log(data);
    })
  };


});
