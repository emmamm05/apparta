app.controller('UsuariosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
      
  }]);
 

app.controller('BuscarUsuarioCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.results = [
	    {	nombre: 	'Bairon',
		apellido: 	'Perez',
		oauth_id: 	'1763484990'},
	    {	nombre: 	'Karla',
		apellido: 	'Madrigal',
		oauth_id: 	'100001429851672'},
	    {	nombre: 	'Emmanuel',
		apellido: 	'Mora',
		oauth_id: 	'1287630773'}
	  ];
  }]);
