angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$timeout) {

$scope.MisMensajes=[];
$scope.miBoton = false;
 var messagesRef = new Firebase('https://tptrivia.firebaseio.com/usuarios');


  $scope.enviarUsuario = function()
  {
  $scope.miBoton = true;
    var name = $('#nameInput').val();
    messagesRef.push({usuario:name});

  }
    

 messagesRef.on('child_added', function (snapshot) {
  $timeout(function(){

    var message = snapshot.val();
    $scope.MisMensajes.push(message);
    console.log($scope.MisMensajes);
    });

  });

})

.controller('ChatsCtrl', function($scope,$timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('AccountCtrl', function($scope) {

})
