angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$timeout,$http) {


$scope.miBoton = false;
 var messagesRef = new Firebase('https://tptrivia.firebaseio.com/usuarios');


  $scope.enviarUsuario = function()
  {
  $scope.miBoton = true;
    var name = $('#nameInput').val();
    messagesRef.push({usuario:name});
  }

})

.controller('ChatsCtrl', function($scope,$timeout,$window) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.MisPreguntas=[];

 var Preguntas = new Firebase('https://tptrivia.firebaseio.com/Preguntas');

$scope.NumeroRandom = Math.floor((Math.random() * 2) + 1);

$scope.pregElegida;
$scope.Respuesta;

 Preguntas.on('child_added', function (snapshot) {
  $timeout(function(){

    var message = snapshot.val();

    if(message.id == $scope.NumeroRandom)
    {
    $scope.pregElegida = message;
    $scope.Respuesta = message.Respuesta;

   // $scope.MisPreguntas.push(message);
    console.log(message);
    console.log(message.Respuesta);
    }

    });

  });

  $scope.Validar = function(RespuestaElegida)
  {
    
  $('.Respuesta').prop( "disabled", true );
    

    if(RespuestaElegida === $scope.Respuesta)
    {
      console.log(RespuestaElegida);
      if(RespuestaElegida == "San Lorenzo" )
      {
        RespuestaElegida = 'op3';
      }

      if(RespuestaElegida == "Lionel Messi" )
      {
        RespuestaElegida = 'op1';
      }

      document.getElementById(RespuestaElegida).className = "button button-large  button-balanced";

    }else
    {
      if(RespuestaElegida == "Cristiano Ronaldo" || RespuestaElegida == "River")
      {
        RespuestaElegida = 'op2';
      }
      if(RespuestaElegida == "Boca")
      {
        RespuestaElegida = 'op1';
      }
      if(RespuestaElegida == "Johann Cruyff")
      {
       RespuestaElegida = 'op3';
      }
     document.getElementById(RespuestaElegida).className = "button button-large button-assertive";
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
