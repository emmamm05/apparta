var app = angular.module('Apparta', [
  "ngRoute",
  "ngTouch",
  "mobile-angular-ui",
  "angular-carousel",
  "gd.ui.jsonexplorer"
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/resultados-apartamentos', {
        templateUrl: 'partials/resultados-apartamentos.html',
        controller: 'ResultadosCtrl'
      }).
      when('/agregar-apartamento', {
        templateUrl: 'partials/agregar-apartamento.html',
        controller: 'AgregarApartamentoCtrl'
      }).
      when('/mis-apartamentos', {
        templateUrl: 'partials/mis-apartamentos.html',
        controller: 'MisApartamentosCtrl'
      }).
      when('/buscar-apartamento', {
        templateUrl: 'partials/buscar-apartamento.html',
        controller: 'BuscarApartamentoCtrl'
      }).
      when('/ver-apartamento', {
        templateUrl: 'partials/ver-apartamento.html',
        controller: 'VerApartamentoCtrl'
      }).
      when('/editar-apartamento', {
        templateUrl: 'partials/editar-apartamento.html',
        controller: 'EditarApartamentoCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
	when('/carousel',  {templateUrl: "partials/carousel.html"}).
      otherwise({
        redirectTo: '/home'
      });
  }]);


app.directive('fundooRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '<i class="icon-star"></i>' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
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
          if (newVal) {
            updateStars();
          }
        });
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