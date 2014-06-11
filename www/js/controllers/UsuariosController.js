app.controller('UsuariosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
      
  }]);

app.controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$localStorage',
  function($rootScope, $scope, $routeParams, $location, $localStorage) {
	$rootScope.isLogged = $localStorage.isLogged || false;
	if($rootScope.isLogged){
		$location.path('/home');
	}
      	$scope.login = function () {
		$rootScope.isLogged 	= true;
		$localStorage.isLogged 	= true;
		console.log("LogIn");
		$location.path('/home');
	};
  }]);

app.controller('LogoutCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$localStorage',
  function($rootScope, $scope, $routeParams, $location, $localStorage) {
      	$scope.logout = function () {
		$rootScope.isLogged = false;
		$localStorage.isLogged = false;
		delete $localStorage.$reset();
		console.log($localStorage.isLogged);
		console.log($rootScope.isLogged);
		console.log("LogOut");
		$location.path('/login');
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

