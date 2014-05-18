app.controller('ApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
    
  }]);
 
app.controller('AgregarApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	gender: 	'unisex',  	
			rating: 	3, 
			location: 	5,
			services: 	{}
		};
  }]);

app.controller('BuscarApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	gender: 	'unisex',  	
			rating: 	3, 
			location: 	5,
			services: 	{}
		};
  }]);
