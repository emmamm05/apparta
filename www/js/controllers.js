/* Controllers */

app.controller('Apartamentos',['$scope','$routeParams',
  function($scope, $routeParams){
                  
  }]);


app.controller('HomeCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      $scope.popular_apartments = [
	    {'title': 'Nexus S',
	     'img': 'http://lorempixel.com/250/205/city/'},
	    {'title': 'Motorola XOOM',
	     'img': 'http://lorempixel.com/250/210/city/'},
	    {'title': 'Nexus S',
	     'img': 'http://lorempixel.com/250/205/city/'},
	    {'title': 'MOTOROLA XOOM™',
	     'img': 'http://lorempixel.com/250/200/city/'}
	  ];
	$scope.recent_apartments = [
	    {'title': 'Nexus S',
	     'img': 'http://lorempixel.com/250/205/city/'},
	    {'title': 'Motorola XOOM',
	     'img': 'http://lorempixel.com/250/210/city/'},
	    {'title': 'Nexus S',
	     'img': 'http://lorempixel.com/250/205/city/'},
	    {'title': 'MOTOROLA XOOM™',
	     'img': 'http://lorempixel.com/250/200/city/'}
	  ];
  }]);


app.controller('ScrollCtrl', function($rootScope, $scope, analytics){

  $rootScope.$on("$routeChangeStart", function(){
    $rootScope.loading = true;
  });

  $rootScope.$on("$routeChangeSuccess", function(){
    $rootScope.loading = false;
  });

  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push("Item " + i);
  }

  $scope.scrollItems = scrollItems;
  $scope.invoice = {payed: true};
  
  $scope.userAgent =  navigator.userAgent;
  $scope.chatUsers = [
    { name: "Carlos  Flowers", online: true },
    { name: "Byron Taylor", online: true },
    { name: "Jana  Terry", online: true },
    { name: "Darryl  Stone", online: true },
    { name: "Fannie  Carlson", online: true },
    { name: "Holly Nguyen", online: true },
    { name: "Bill  Chavez", online: true },
    { name: "Veronica  Maxwell", online: true },
    { name: "Jessica Webster", online: true },
    { name: "Jackie  Barton", online: true },
    { name: "Crystal Drake", online: false },
    { name: "Milton  Dean", online: false },
    { name: "Joann Johnston", online: false },
    { name: "Cora  Vaughn", online: false },
    { name: "Nina  Briggs", online: false },
    { name: "Casey Turner", online: false },
    { name: "Jimmie  Wilson", online: false },
    { name: "Nathaniel Steele", online: false },
    { name: "Aubrey  Cole", online: false },
    { name: "Donnie  Summers", online: false },
    { name: "Kate  Myers", online: false },
    { name: "Priscilla Hawkins", online: false },
    { name: "Joe Barker", online: false },
    { name: "Lee Norman", online: false },
    { name: "Ebony Rice", online: false }
  ];

});


