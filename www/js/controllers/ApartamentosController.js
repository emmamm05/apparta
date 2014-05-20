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


app.controller('VerApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	descripcion: 		'descripcion del aparta',  	
			direccion_fisica: 	'direccion del aparta', 
			area: 			230,  	
			ubicacion_latitud: 	5.342, 
			ubicacion_longitud: 	10.2323, 
			cercania_tec: 		5, 
			//comentarios: 	[Comentario], 
			//calificaciones: 	[Calificacion], 
			mensualidad: 		70000, 
			habitaciones: 		5, 
			titulo: 		'Titulo del aparta', 
			genero: 		'female', 
			opcion_agua: 		true, 
			opcion_electricidad: 	true, 
			opcion_seguridad: 	true, 
			opcion_internet: 	true,
			foto_1:		 	'http://lorempixel.com/250/200/city/',
			foto_2:		 	'http://lorempixel.com/250/200/city/',
			foto_3:		 	'http://lorempixel.com/250/200/city/',
			foto_4:		 	'http://lorempixel.com/250/200/city/'
		};
  }]);

