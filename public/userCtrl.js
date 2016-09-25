
angular.module('starter')
.controller('userCtrl',['$scope', '$http', function($scope, $http){

  $scope.pin;
  $scope.bikeId=1;
  $scope.userId=2;

  function chiamata() {
    console.log($scope.pin);
    $http({
    method: 'POST',
    data:{"userId":$scope.userId, "bikeId":$scope.bikeId, "pin":$scope.pin},
    url: '/app/map',
  }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $('#test').on('click', function () {
   var $btn = $(this);
   chiamata();
   $btn.button('reset');
 })

}])
