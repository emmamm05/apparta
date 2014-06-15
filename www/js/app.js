var app = angular.module('Apparta', [
  "ngRoute",
  "ngTouch",
  "ngAnimate",
  "mobile-angular-ui",
  "angularMoment",
  "gd.ui.jsonexplorer",
  "toaster",
  "google-maps",
  "uiSlider",
  "ngStorage",
  "openfb"
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/logout', {
        templateUrl: 'partials/logout.html',
        controller: 'LogoutCtrl'
      }).
      when('/configuracion', {
        templateUrl: 'partials/configuracion.html',
        controller: 'ConfiguracionCtrl'
      }).
      when('/resultados-apartamentos', {
        templateUrl: 'partials/resultados-apartamentos.html',
        controller: 'ResultadosCtrl'
      }).
      when('/agregar-apartamento', {
        templateUrl: 'partials/agregar-apartamento.html',
        controller: 'AgregarApartamentoCtrl',
      }).
      when('/mis-apartamentos', {
        templateUrl: 'partials/mis-apartamentos.html',
        controller: 'MisApartamentosCtrl'
      }).
      when('/buscar-apartamento', {
        templateUrl: 'partials/buscar-apartamento.html',
        controller: 'BuscarApartamentoCtrl'
      }).
      when('/ver-apartamento/:id', {
        templateUrl: 'partials/ver-apartamento.html',
        controller: 'VerApartamentoCtrl'
      }).
      when('/editar-apartamento/:id', {
        templateUrl: 'partials/editar-apartamento.html',
        controller: 'EditarApartamentoCtrl'
      }).
      when('/apartamentos-interes', {
        templateUrl: 'partials/apartamentos-interes.html',
        controller: 'ApartamentosInteresCtrl'
      }).
      when('/buscar-usuario', {
        templateUrl: 'partials/buscar-usuario.html',
        controller: 'BuscarUsuarioCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
	    when('/carousel',  {templateUrl: "partials/carousel.html"}).
      otherwise({
        redirectTo: '/login'
      });
  }]);




app.directive('fundooRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" class="{{color}}" ng-click="toggle($index)">' +
                    '<i class="icon-{{icon}}"></i>' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        icon: '@',
        color: '@',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };
        scope.$watch('ratingValue', function(oldVal, newVal) {
	  scope.icon  = scope.icon 	|| "star";
	  scope.color = scope.color 	|| "yellow";
          if (newVal) {
            updateStars();
          }
        });
      }
    }
  });


app.directive('imginteresados', function () {
    return {
      restrict: 'A',
      template: '<ul class="interesados">' +
                  '<li ng-repeat="interesado in interesados | limitTo:max">' +
                    '<img ng-click="dial({currentUser:interesado});" src="http://graph.facebook.com/{{interesado.oauth_id}}/picture" />' +
                  '</li>' +
                  '<li><span class="label label-success">{{interesadosMas}}</span></li>' +
                '</ul>',
      scope: {
        max: '=',
        interesados: '=',
        interesadosMas: '&',
        dial: "&"
      },
      link: function(scope, elem, attrs) {
        scope.toggle = function(interesado) {
	  scope.callBackMethod({currentUser:interesado});
        };
	scope.interesadosMas = scope.interesados.length-scope.max;
	if(scope.interesadosMas>0){
		scope.interesadosMas = "+"+scope.interesadosMas;
	} else{
		scope.interesadosMas = "";
	}
      }
    }
  });

app.directive('profile', function () {
    return {
      restrict: 'A',
      template: '<div class="col-xs-12 profile">'+
			'<img src="http://graph.facebook.com/{{user.oauth_id}}/picture"'+ 
				'class="img-circle center-block img-responsive col-xs-6 col-sm-4 col-md-6 ">'+
			'</img>'+		
			'<h2 class="text-center">{{user.nombre+" "+user.apellido}}</h2>'+
			'<div class="row">'+
				'<div class="col-xs-10 col-xs-offset-1">'+
					'<div 	ng-click="openSocialProfile(user.oauth_id, user.oauth_proveedor);"'+
						'class="btn btn-block btn-social btn-facebook">'+
						'<i class="icon-facebook"></i> Ver perfil'+
					'</div>'+
					'<a ng-if="user.telefono" class="btn btn-block btn-social btn-phone" ng-href="tel:{{user.telefono}}" >'+
						'<i class="icon-phone" ></i> Llamar'+
					'</a>'+
					'<a ng-if="user.telefono" class="btn btn-block btn-social btn-info"'+ 
						'ng-href="sms:{{user.telefono}}?body=Hola, vi su anuncio en Apparta y me interesa'+ 
						'obtener más información del aparmentamento.">'+
						'<i class="icon-mail"></i> Mensaje de texto'+
					'</a>'+
				'</div>'+
			'</div>'+
		'</div>',
      scope: {
        user: '=',
      },
      link: function(scope, elem, attrs) {

      }
    }
  });

/*
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/',          {templateUrl: "partials/home.html"});
  $routeProvider.when('/scroll',    {templateUrl: "partials/scroll.html"}); 
  $routeProvider.when('/toggle',    {templateUrl: "partials/toggle.html"}); 
  $routeProvider.when('/tabs',      {templateUrl: "partials/tabs.html"}); 
  $routeProvider.when('/accordion', {templateUrl: "partials/accordion.html"}); 
  $routeProvider.when('/overlay',   {templateUrl: "partials/overlay.html"}); 
  $routeProvider.when('/forms',     {templateUrl: "partials/forms.html"});
  $routeProvider.when('/carousel',  {templateUrl: "partials/carousel.html"});
});
*/

app.service('analytics', [
  '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
    var send = function(evt, data) {
      ga('send', evt, data);
    }
  }
]);

app.directive( "carouselExampleItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element.parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        element[0].style["-webkit-transform"] = "translate3d("+x+"px,"+ y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-moz-transform"] = "translate3d("+x+"px," + y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-ms-transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-o-transform"] = "translate3d("+x+"px," + y  + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
      }

      $swipe.bind(element, {
        start: function(coords) {
          endAction = null;
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          endAction = null;
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          if (endAction == "prev") {
            $rootScope.carouselPrev(carouselId);
          } else if (endAction == "next") {
            $rootScope.carouselNext(carouselId);
          }
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        move: function(coords) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            if (deltaXRatio > 0.3) {
              endAction = "next";
            } else if (deltaXRatio < -0.3){
              endAction = "prev";
            } else {
              endAction = null;
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
});

app.run(function(amMoment, OpenFB) {
	amMoment.changeLanguage('es');
	OpenFB.init('1524504121110873');
});

/*************************************************************************************/
/********************************       cordova      *********************************/
/*************************************************************************************/
app.factory('cordovaReady', function ($q, $rootScope, $document) {
        var deferred = $q.defer();
        $document.bind('deviceready', function () {
            $rootScope.$apply(deferred.resolve);
        });

        return {
            ready: function () {
                return deferred.promise;
            }
        };
    })
    .run(function (cordovaReady) {});

var Camera = Camera || {
    PictureSourceType: {
        PHOTOLIBRARY : 0,
        CAMERA : 1,
        SAVEDPHOTOALBUM : 2
    },
    DestinationType: {
        DATA_URL : 0,
        FILE_URI : 1,
        NATIVE_URI : 2
    },
    EncodingType: {
        JPEG : 0,
        PNG : 1
    },
    MediaType: {
        PICTURE: 0,
        VIDEO: 1,
        ALLMEDIA : 2
    },
    Direction: {
        BACK : 0,
        FRONT : 1
    }
};

app.factory('geolocation', function ($q, $window, cordovaReady) {
        var idCounter = 0;
        var watchMap = {};

        return {
            getCurrentPosition: function (onSuccess, onError, options) {
                cordovaReady.ready().then(function () {
                    $window.navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
                });
            },
            watchPosition: function (onSuccess, onError, options) {
                var watchId = (++idCounter).toString(10);
                cordovaReady.ready().then(function () {
                    watchMap[watchId] = $window.navigator.geolocation.watchPosition(onSuccess, onError, options);
                });
                return watchId;
            },
            clearWatch: function (watchId) {
                if (watchMap[watchId]) {
                    cordovaReady.ready().then(function () {
                        $window.navigator.geolocation.clearWatch(watchMap[watchId]);
                        delete watchMap[watchId];
                    });
                }
            }
        };
    });

app.factory('camera', function ($q, $window, cordovaReady) {
        return {
            getPicture: function (onSuccess, onError, options) {
                cordovaReady.ready().then(function () {
                    $window.navigator.camera.getPicture(onSuccess, onError, options);
                });
            },
            cleanup: function (onSuccess, onError) {
                cordovaReady.ready().then(function () {
                    $window.navigator.camera.cleanup(onSuccess, onError);
                });
            },
            PictureSourceType: Camera.PictureSourceType,
            DestinationType: Camera.DestinationType,
            EncodingType: Camera.EncodingType,
            MediaType: Camera.MediaType,
            Direction: Camera.Direction
        };
    });


/**************************** filters ************************************/

app.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){
			if(item.nombre.toLowerCase().indexOf(searchString) !== -1 || item.apellido.toLowerCase().indexOf(searchString) !== -1 ){
				result.push(item);
			}
		});
		return result;
	};
});

// permite conectarse con sms y tel
app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|sms):/);
}]);

window.onload = function() { 
  var txts = document.getElementsByTagName('textarea') 

  for(var i = 0, l = txts.length; i < l; i++) {
    if(/^[0-9]+$/.test(txts[i].getAttribute("maxlength"))) { 
      var func = function() { 
        var len = parseInt(this.getAttribute("maxlength"), 10); 

        if(this.value.length > len) { 
          alert('Maximum length exceeded: ' + len); 
          this.value = this.value.substr(0, len); 
          return false; 
        } 
      }
      txts[i].onkeyup = func;
      txts[i].onblur = func;
    } 
  } 
}


