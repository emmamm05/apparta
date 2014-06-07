app.controller('UsuariosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
      
  }]);
 

app.controller('BuscarUsuarioCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.results = [
	    {	id: 		'1',
		nombre: 	'Bairon',
		apellido: 	'Perez',
		oauth_id: 	'1763484990'},
	    {	id: 		'2',
		nombre: 	'Karla',
		apellido: 	'Madrigal',
		oauth_id: 	'100001429851672'},
	    {	id: 		'3',
		nombre: 	'Emmanuel',
		apellido: 	'Mora',
		oauth_id: 	'1287630773'}
	  ];
  }]);
