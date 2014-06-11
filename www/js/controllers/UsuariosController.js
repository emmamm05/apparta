app.controller('UsuariosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
      
  }]);

app.controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', '$location',
  function($rootScope, $scope, $routeParams, $location) {
	if($rootScope.isLogged){
		$location.path('/home');
	}
      	$scope.login = function () {
		$rootScope.isLogged = true;
		$location.path('/home');
	};
  }]);
 

app.controller('BuscarUsuarioCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.results = [
	    {	id: 		'1',
		nombre: 	'Bairon',
		apellido: 	'Perez',
		oauth_id: 	'1763484990',
		oauth_proveedor: 'facebook',
		telefono:	 '8888-1234'},
	    {	id: 		'2',
		nombre: 	'Karla',
		apellido: 	'Madrigal',
		oauth_id: 	'100001429851672',
		oauth_proveedor: 'facebook',
		telefono:	 '8888-1234'},
	    {	id: 		'3',
		nombre: 	'Emmanuel',
		apellido: 	'Mora',
		oauth_id: 	'1287630773',
		oauth_proveedor: 'facebook',
		telefono:	 '8888-1234'}
	  ];

	$scope.currentItem = $scope.results[0];
	$scope.selectItem = function(user){
		$scope.currentItem = user;	
	};
	$scope.clearSearch = function(){
		$scope.searchString = "";		
	};
	$scope.openSocialProfile = function(id, prov){
		var url;
		if(prov=="facebook"){
			url = "http://www.facebook.com/"+id;
		}else{
			url = "http://plus.google.com/"+id+"/posts";
		}
		return window.open(encodeURI(url), '_system', 'location=yes');
	};

  }]);

