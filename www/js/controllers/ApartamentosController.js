var root = "http://localhost:8080/api";

app.service('ApartamentosService',['$http',function($http){
	var results = [];
	var item;
	this.buscarAparta = function(){
	console.log("buscando... "+this.item);
	$http({method: 'GET', url: root + "/apartamentos/search",
	  headers:{ 'Accept':'*/*'},
	  data: item }).
	  success(function(data, status, headers, config) {
	    console.log("POST Sucess");
	    console.log();
	  }).
	  error(function(data, status, headers, config) {
	    console.log("POST error");
	    console.log(status);
	    console.log(data);
	  });
    };
}]);

app.controller('ApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
    
  }]);
 

app.controller('AgregarApartamentoCtrl', ['$scope', 'geolocation', 'camera','$routeParams', '$http','toaster',
  function($scope, geolocation, camera, $routeParams, $http, toaster) {
    //$scope.item = ApartamentosAPIService.CREATE;
    $scope.item = {	genero: 'unisex',
    				opcion_agua: false,
    				opcion_electricidad: false,
    				opcion_internet: false,
    				opcion_seguridad: false,
    				fotos:[
						{src: 'img/add_img.png'},
						{src: 'img/add_img.png'},
						{src: 'img/add_img.png'},
						{src: 'img/add_img.png'}
			    	]
    };
	$scope.map = {
	    center: {
	        latitude: 9.855756503226328,
	        longitude: -83.91060333698988
	    },
	    zoom: 17
	};

 	geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
			$scope.item.ubicacion_latitud =  position.coords.latitude;
	    	$scope.item.ubicacion_longitud =  position.coords.longitude;
            });
        }, function(error) {
            $scope.$apply(function() {
                $scope.error = error;
            });
        }, {});  

	$scope.getPhoto = function(index){	
		camera.getPicture(function(image) {
			    $scope.$apply(function() {
				$scope.item.fotos[index].src = "data:image/jpeg;base64," + image;
			    });
			}, function(error) {
			    $scope.$apply(function() {
				$scope.error = error;
			    });
			}, {
			    destinationType: Camera.DestinationType.DATA_URL,
			    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			    encodingType: Camera.EncodingType.JPEG,
			    quality: 50
			});
	}
    $scope.crearAparta = function(){
      console.debug($scope.item);
      $http({method: 'POST', url: "http://localhost:8080/api/apartamentos",
		headers:{ 'Accept':'*/*'},
		data: $scope.item }).
		success(function(data, status, headers, config) {
		  console.log("POST Sucess");
		  toaster.pop('success', "??Genial!", 'Se han guardado los cambios', null, 'trustedHtml');
		}).
		error(function(data, status, headers, config) {
		  console.log("POST error");
			  console.log('$scope.crearAparta: status:'+status);
			  toaster.pop('error', "Error", 'No se pudo crear el apartamento', null, 'trustedHtml');
		});
	    };
  }]);

app.controller('BuscarApartamentoCtrl', ['$scope', '$routeParams','$http','ApartamentosService',
  function($scope, $routeParams,$http, ApartamentosService) {
     $scope.item = {	genero: 	'unisex',  	
			calificacion: 	3, 
			cercania_tec: 	5
		};
	$scope.demo2 = {
	    range: {
		min: 0,
		max: 10050
	    },
	    minPrice: 1000,
	    maxPrice: 4000
	};
	ApartamentosService.item = $scope.item;
	$scope.buscarAparta = ApartamentosService.buscarAparta;
	console.log("BuscarApartamentoCtrl/buscarAparta: ",ApartamentosService.item);
}]);


app.controller('ResultadosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.order = 'calificacion';
	$scope.reverse = true;
	console.log('results: '+ApartamentosService.results);
	$scope.results = [
	    {'titulo': 'Barato y espacioso',
	     'calificacion': '3',
	     'area': '220',
	     'habitaciones': '5',
	     'sexo': 'male',
	     'cercania_tec': '1.8', 
	     'mensualidad': 150000, 
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/city/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	    {'titulo': 'Oferta!!',
	     'calificacion': '5',
	     'area': '220',
	     'habitaciones': '3',
	     'sexo': 'unisex',
	     'cercania_tec': '2.1',
	     'mensualidad': 70000, 
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/technics/'},
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	    {'titulo': 'Primeros ingresos',
	     'calificacion': '1',
	     'area': '320',
	     'habitaciones': '4',
	     'sexo': 'female',
	     'cercania_tec': '7.2',
	     'mensualidad': 320000, 
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	  ];
  }]);

app.controller('VerApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     $scope.item = {	descripcion: 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus dolor non fermentum imperdiet. Phasellus adipiscing tellus in nibh rhoncus, ac convallis erat ullamcorper. Nullam interdum mi et ultrices iaculis. Mauris placerat dolor massa, eget aliquet elit aliquet id.',  	
			direccion_fisica: 	'direccion del aparta', 
			area: 			230,  	
			ubicacion_latitud: 	5.342, 
			ubicacion_longitud: 	10.2323, 
			cercania_tec: 		5, 
			calificacion: 		4, 
			mensualidad: 		70000, 
			habitaciones: 		5, 
			titulo: 		'Titulo del aparta', 
			genero: 		'male', 
			opcion_agua: 		true, 
			opcion_electricidad: 	true, 
			opcion_seguridad: 	true, 
			opcion_internet: 	true,
			fotos: 		[
							{src: 'http://lorempixel.com/250/200/city/'},
							{src: 'http://lorempixel.com/250/200/abstract/'},
							{src: 'http://lorempixel.com/250/200/transport/'},
							{src: 'http://lorempixel.com/250/200/technics/'}
					],
			comentarios: 	[
						{
							contenido: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate',
							fecha_publicacion: "2014-02-08 09:30",
							autor: {
								nombre: 	'Bairon',
								apellido: 	'Perez',
								oauth_id: 	'1763484990',
								}
						},
						{
							contenido: 'Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. ',
							fecha_publicacion: "2014-05-08 09:30",
							autor: {
								nombre: 	'Karla',
								apellido: 	'Madrigal',
								oauth_id: 	'100001429851672',
								}
						},
						{
							contenido: 'Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. ',
							fecha_publicacion: "2013-02-08 09:30",
							autor: {
								nombre: 	'Emmanuel',
								apellido: 	'Mora',
								oauth_id: 	'1287630773',
								}
						}
				    	]
		};

    $scope.nueva_calificacion = 5;
    $scope.nuevo_comentario = "";
    $scope.max_len_comentario = 140;

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };


  }]);



app.controller('MisApartamentosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.order = 'calificacion';
	$scope.reverse = true;
	$scope.results = [
	    {'titulo': 'Barato y espacioso',
	     'calificacion': '3',
	     'area': '220',
	     'habitaciones': '5',
	     'sexo': 'male',
	     'cercania_tec': '1.8',
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/city/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	    {'titulo': 'Oferta!!',
	     'calificacion': '5',
	     'area': '220',
	     'habitaciones': '3',
	     'sexo': 'unisex',
	     'cercania_tec': '2.1',
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/technics/'},
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	    {'titulo': 'Primeros ingresos',
	     'calificacion': '1',
	     'area': '320',
	     'habitaciones': '4',
	     'sexo': 'female',
	     'cercania_tec': '7.2',
	     'descripcion': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lectus ligula. Nunc massa nisl, accumsan nec molestie eu.',
	     'fotos':[
			{src: 'http://lorempixel.com/250/200/transport/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/abstract/'},
			{src: 'http://lorempixel.com/250/200/technics/'}
		    	]},
	  ];
  }]);


app.controller('EditarApartamentoCtrl', ['$scope', '$routeParams', 'toaster',
  function($scope, $routeParams, toaster) {

     $scope.save = function(){
        toaster.pop('success', "??Genial!", 'Se han guardado los cambios', null, 'trustedHtml');
    };
    
     
     $scope.item = {	descripcion: 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus dolor non fermentum imperdiet. Phasellus adipiscing tellus in nibh rhoncus, ac convallis erat ullamcorper. Nullam interdum mi et ultrices iaculis. Mauris placerat dolor massa, eget aliquet elit aliquet id.',  	
			direccion_fisica: 	'direccion del aparta', 
			area: 			230,  	
			ubicacion_latitud: 	5.342, 
			ubicacion_longitud: 	10.2323, 
			cercania_tec: 		5, 
			//comentarios: 	[Comentario], 
			//calificaciones: 	[Calificacion], 
			mensualidad: 		70000, 
			habitaciones: 		5, 
			titulo: 		'Titulo aparta', 
			genero: 		'male', 
			opcion_agua: 		true, 
			opcion_electricidad: 	true, 
			opcion_seguridad: 	true, 
			opcion_internet: 	true,
			fotos: 		[
							{src: 'http://lorempixel.com/250/200/city/'},
							{src: 'http://lorempixel.com/250/200/abstract/'},
							{src: 'http://lorempixel.com/250/200/transport/'},
							{src: 'http://lorempixel.com/250/200/technics/'}
					    	]
		};

  }]);
