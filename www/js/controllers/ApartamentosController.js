var root = "http://localhost:8080/api";

app.service('ApartamentosService',['$http','$location',function($http,$location){
	var mResults = [];
	var mItem;
	this.buscarAparta = function(item){
		console.log( "buscando... " + mItem + item);
		mItem = item;
		$http({method: 'GET', url: root + "/apartamentos/search",
			headers:{ 'Accept':'*/*'},
			params: mItem }).
				success(function(data, status, headers, config) {
					console.log("POST Sucess "+data);
					mResults = data;
					$location.path("/resultados-apartamentos");
				}).
				error(function(data, status, headers, config) {
					console.log("POST error");
					console.log(status);
					console.log(data);
				});
	};
	this.getResults = function(){
		return mResults;
	};
}]);

app.controller('ApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    //Falta hay q hacer lo de facebook

  }]);
 

app.controller('AgregarApartamentoCtrl', ['$scope', '$location', 'geolocation', 'camera', '$routeParams', '$http','toaster',
  function( $scope, $location, geolocation, camera, $routeParams, $http, toaster ) {

    $scope.item = {	genero: 'unisex',
    				opcion_agua: false,
    				opcion_electricidad: false,
    				opcion_internet: false,
    				opcion_seguridad: false,
    				ubicacion_latitud: 9.855756503226328,
    				ubicacion_longitud: 83.91060333698988,
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
	    zoom: 15
	};

	$scope.isShow = true;

	google.maps.event.trigger($scope.map,'resize');

 	geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
				$scope.item.ubicacion_latitud 	=  position.coords.latitude;
		    	$scope.item.ubicacion_longitud  =  position.coords.longitude;
            });
        }, function(error) {
            	$scope.$apply(function() {
                $scope.error = error;
            });
        }, {});  

 	$scope.markers = [{
		id: 1,
		coords:{
		    latitude: 9.855756503226328,
		    longitude: -83.91060333698988
		},
	    options:{
		icon:"img/marker.png",
	    	draggable: true	    	
	    },
	    content: "Nuevo Apartamento",
	    events:{
	    	dragend: function(marker,event,args){
				console.log("onMarkerMoved "+JSON.stringify(marker.getPosition()));
				$scope.item.ubicacion_latitud = marker.getPosition().lat();
				$scope.item.ubicacion_longitud = marker.getPosition().lng();	    	
				toaster.pop('warning', "Geolocation", JSON.stringify($scope.map.center.latitude), null, 'trustedHtml');

			}
	    }
	}];

	google.maps.event.trigger($scope.map, 'resize');

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
      	console.debug(JSON.stringify($scope.item));
        $http({method: 'POST', url: "http://localhost:8080/api/apartamentos",
		headers:{ 'Accept':'*/*'},
		data: $scope.item }).
		success(function(data, status, headers, config) {
		  console.log("POST Sucess");
		  toaster.pop('success', "Genial!", 'Se han guardado los cambios', null, 'trustedHtml');
		  $location.path('/mis-apartamentos');
		}).
		error(function(data, status, headers, config) {
		  console.log("POST error");
		  console.log('$scope.crearAparta: status:'+status);
		  toaster.pop('error', "Error", 'No se pudo crear el apartamento', null, 'trustedHtml');
		});
	};
  }]);

app.controller('BuscarApartamentoCtrl', ['$scope', '$location','$routeParams','$http','ApartamentosService',
  function($scope, $location, $routeParams,$http, ApartamentosService) {
    $scope.item = {	
    	genero: 'unisex',  	
		calificacion: 	3, 
		cercania_tec: 	5,
		min_mensualidad:50000,
		max_mensualidad:300000,
		habitaciones:	2
	};
	$scope.buscarAparta = function(item){
		ApartamentosService.mItem = $scope.item;
		console.log("BuscarApartamentoCtrl/buscarAparta: " + ApartamentosService.mItem);
		ApartamentosService.buscarAparta($scope.item);
	}
}]);


app.controller('ResultadosCtrl', ['$scope', '$routeParams','ApartamentosService',
  function($scope, $routeParams,ApartamentosService) {
	$scope.order = 'calificacion';
	$scope.reverse = true;
	console.log('results: '+JSON.stringify(ApartamentosService.getResults()));
	$scope.results = ApartamentosService.getResults();
  }]);



app.controller('ApartamentosInteresCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.results = [
	    {'id': '1',
	     'titulo': 'Barato y espacioso',
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
		    	],
	     'interesados':[
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
		  ]},
	    {'id': '2',
	     'titulo': 'Oferta!!',
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
		    	],
	     'interesados':[
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
		  ]},
	    {'id': '3',
	     'titulo': 'Primeros ingresos',
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
		    	],
	     'interesados':[
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
			telefono:	 '8888-1234'}
		  ]},
	  ];


	$scope.order = 'calificacion';
	$scope.reverse = true;
	$scope.interesadosMax  = 3;
	$scope.selectUser = function (currentUser) {
		$scope.currentUser = currentUser;
		$scope.toggle('rightSidebar');
	};
  }]);


app.controller('VerApartamentoCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
     console.log($routeParams.id);
     $scope.item = {	id: '1',
	     		descripcion: 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus dolor non fermentum imperdiet. Phasellus adipiscing tellus in nibh rhoncus, ac convallis erat ullamcorper. Nullam interdum mi et ultrices iaculis. Mauris placerat dolor massa, eget aliquet elit aliquet id.',  	
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
	    {'id': '1',
	     'titulo': 'Barato y espacioso',
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
	    {'id': '2',
	     'titulo': 'Oferta!!',
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
	    {'id': '3',
	     'titulo': 'Primeros ingresos',
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
     console.log($routeParams.id);
     $scope.save = function(){
        toaster.pop('success', "??Genial!", 'Se han guardado los cambios', null, 'trustedHtml');
    };
    
     
     $scope.item = {	id: '1',
			descripcion: 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus dolor non fermentum imperdiet. Phasellus adipiscing tellus in nibh rhoncus, ac convallis erat ullamcorper. Nullam interdum mi et ultrices iaculis. Mauris placerat dolor massa, eget aliquet elit aliquet id.',  	
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
