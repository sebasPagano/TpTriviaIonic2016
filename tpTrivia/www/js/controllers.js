angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$timeout,$state,$cordovaNativeAudio,$ionicPlatform) {


$ionicPlatform.ready(function(){
  try
  {
    $cordovaNativeAudio.loop('Futbol');
   
  }
  catch(ex)
  {
    console.log(ex);
  }

  });


$scope.miBoton = false;
 var messagesRef = new Firebase('https://tptrivia.firebaseio.com/usuarios');


  $scope.enviarUsuario = function()
  {
  $scope.miBoton = true;
    var name = $('#nameInput').val();
    messagesRef.push({usuario:name});
    $state.go('tab.chats');
  }



})

.controller('ChatsCtrl', function($scope,$timeout,$window,$state,$cordovaVibration,$cordovaNativeAudio,$ionicPlatform) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.Preguntas = [];
 $scope.Preguntas = new Firebase('https://tptrivia.firebaseio.com/Preguntas');

$scope.NumeroRandom = Math.floor((Math.random() * 6) + 1);


console.log($scope.Preguntas);
 $scope.Preguntas.on('child_added', function (snapshot) {
  $timeout(function(){

    var message = snapshot.val();

    if(message.id == $scope.NumeroRandom)
    {
    $scope.pregElegida = message;
    $scope.Respuesta = message.Respuesta;

   // $scope.MisPreguntas.push(message);

    console.log(message.Respuesta);
    }

    });

  });

  $scope.Validar = function(RespuestaElegida)
  {

    if(RespuestaElegida === $scope.Respuesta)
    {

      $cordovaNativeAudio.play('correcto');
      document.getElementById(RespuestaElegida).className = "button p button-large  button-balanced";
      try{
      $cordovaVibration.vibrate(300);
          
        }
        catch(ex)
        {
          console.log(ex);
        }
    }else
    {
    $cordovaNativeAudio.play('incorrecto');
     document.getElementById(RespuestaElegida).className = "button p button-large button-assertive";
     try{ 

       $cordovaVibration.vibrate([300,300,300]);
       
                   }
        catch(ex)
        {
          console.log(ex);
        }
    }

  }

//  document.getElementById(op1).className = "button button-assertive";

  $scope.Desh = false;
  $scope.Deshabilitar = function()
  {

    $scope.Desh = true;
    return $scope.Desh;
  }

    $scope.siguientePregunta = function() {
    
   $window.location.reload();
  }



})

.controller('AccountCtrl', function($scope) {

})
