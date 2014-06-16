var root = "http://apparta.herokuapp.com/api";

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
 

app.controller('AgregarApartamentoCtrl', ['$scope', '$localStorage','$location', 'geolocation', 'camera', '$routeParams', '$http','toaster',
  function( $scope, $localStorage ,$location, geolocation, camera, $routeParams, $http, toaster ) {

    $scope.item = {	
    		genero: 'unisex',
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
		    	// $scope.item.cercania_tec = getDistanceFromLatLonInKm(
		    	// 	position.coords.latitude,position.coords.longitude,
		    	// 	9.855756503226328,-83.91060333698988
		    	// );
            	$scope.item.cercania_tec = 5;
            });
        }, function(error) {
            	$scope.$apply(function() {
                $scope.error = error;
            });
        }, {});  

 	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

	function deg2rad(deg) {
	  return deg * (Math.PI/180)
	}

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
      	console.debug(JSON.stringify($scope.item)+ JSON.stringify($localStorage.user));
      	//PATCH imagenes
  		$scope.item.foto_uno    = $scope.item.fotos[0].src;
  		$scope.item.foto_dos    = $scope.item.fotos[1].src;
  		$scope.item.foto_tres   = $scope.item.fotos[2].src;
  		$scope.item.foto_cuatro = $scope.item.fotos[3].src;
  		$scope.item.cercania_tec = 1.8;

        $http({method: 'POST', url: "http://apparta.herokuapp.com/api/apartamentos/"+$localStorage.user._id,
		headers:{ 'Accept':'*/*'},
		data: $scope.item
		}).
		success(function(data, status, headers, config) {
		  console.log("POST Sucess");
		  toaster.pop('success', "Genial!", 'Se han guardado los cambios', null, 'trustedHtml');
		  $location.path('/mis-apartamentos');
		}).
		error(function(data, status, headers, config) {
		  console.log("POST error "+data+headers+config);
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
	for ( var i=0 ; i < $scope.results.length ; i++ ){
		$scope.results[i].fotos = [];
		$scope.results[i].fotos.push( {src:$scope.results[i].foto_uno} );
		$scope.results[i].fotos.push( {src:$scope.results[i].foto_dos} );
		$scope.results[i].fotos.push( {src:$scope.results[i].foto_tres} );
		$scope.results[i].fotos.push( {src:$scope.results[i].foto_cuatro} );
	};
  }]);



app.controller('ApartamentosInteresCtrl', ['$scope', '$routeParams', '$localStorage',
  function($scope, $routeParams, $localStorage) {

     $http({method: 'GET', url: root + "/interesados/"+$localStorage.user._id,
			headers:{ 'Accept':'*/*'}}).
				success(function(data, status, headers, config) {
					console.log("POST Sucess "+data);
					$scope.results = data;
				}).
				error(function(data, status, headers, config) {
					console.log("POST error");
					console.log(status);
					console.log(data);
				});
	$scope.order = 'calificacion';
	$scope.reverse = true;
	$scope.interesadosMax  = 3;
	$scope.selectUser = function (currentUser) {
		$scope.currentUser = currentUser;
		$scope.toggle('rightSidebar');
	};
  }]);



app.controller('VerApartamentoCtrl', ['$scope', '$routeParams','$http','$localStorage','toaster',
  function($scope, $routeParams,$http,$localStorage,toaster) {
     console.log($routeParams.id);
     $scope.item = "";
     $http({method: 'GET', url: root + "/apartamentos/"+$routeParams.id,
			headers:{ 'Accept':'*/*'}}).
				success(function(data, status, headers, config) {
					console.log("POST Sucess "+data);
					$scope.item = data;
					$scope.item.fotos = [
							{src: $scope.item.foto_uno},
							{src: $scope.item.foto_dos},
							{src: $scope.item.foto_tres},
							{src: $scope.item.foto_cuatro}
					    	];
				}).
				error(function(data, status, headers, config) {
					console.log("POST error");
					console.log(status);
					console.log(data);
				});

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

    $scope.add_interes = function(){
    	$http({method: 'PUT', url: root + "/apartamentos/"+$routeParams.id,
			headers:{ 'Accept':'*/*'},
			data: { usuario_id:$localStorage.user._id, aparta_id:$scope.item._id } }).
				success(function(data, status, headers, config) {
					console.log("POST Sucess "+data);
        			toaster.pop('success', "Genial!", 'Se han guardado los cambios', null, 'trustedHtml');					
				}).
				error(function(data, status, headers, config) {
					console.log("POST error");
        			toaster.pop('error', "Oops, algo ha sucedido, contacte a emma", null, 'trustedHtml');
					console.log(status);
					console.log(data);
				});
    };


  }]);



app.controller('MisApartamentosCtrl', ['$scope', '$routeParams','$localStorage','$http',
  function($scope, $routeParams, $localStorage,$http) {
	$scope.order = 'calificacion';
	$scope.reverse = true;
	console.log(root + "/misapartas/"+ $localStorage.user._id);
	$http({method: 'GET', url: root + "/misapartas/"+ $localStorage.user._id,
			headers:{ 'Accept':'*/*'}
			}).
				success(function(data, status, headers, config) {
					console.log("POST Sucess "+JSON.stringify(data));
					$scope.results = data;
					for ( var i=0 ; i < $scope.results.length ; i++ ){
						$scope.results[i].fotos = [];
						$scope.results[i].fotos.push( {src:$scope.results[i].foto_uno} );
						$scope.results[i].fotos.push( {src:$scope.results[i].foto_dos} );
						$scope.results[i].fotos.push( {src:$scope.results[i].foto_tres} );
						$scope.results[i].fotos.push( {src:$scope.results[i].foto_cuatro} );
					};
				}).
				error(function(data, status, headers, config) {
					console.log("POST error");
					console.log(status);
					console.log(data);
				});
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
