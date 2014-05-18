app.controller('ApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
    
  }]);
 
app.controller('AgregarApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	sexo: 	'unisex'
		};
  }]);

app.controller('BuscarApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	sexo: 	'unisex',  	
			calificacion: 	3, 
			cercania_tec: 	5
		};
  }]);
