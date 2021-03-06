var root = "http://apparta.herokuapp.com/api";

app.service('LoginAPI',['$http','$location','$localStorage',function($http,$location,$localStorage){
	var userId;
	this.login = function(user){		
		console.log("LoginAPI --------------");
		$http({method: 'POST', url: root + "/usuarios",
		headers:{ 'Accept':'*/*'},
		data: user }).
			success(function(data, status, headers, config) {
				console.log("dataLoginAPI//"+JSON.stringify(data[0]["_id"]));
				userId = data[0]["_id"];
				$localStorage.isLogged 	= true;
				$localStorage.user = data[0];
				$localStorage.user._id = userId;
				console.log("dataLoginAPI "+$localStorage.user);		
				$location.path('/home');
			}).
			error(function(data, status, headers, config) {
				console.log("Error LoginAPI");
			});
	};
	this.getUserId = function(){
		return userId;
	};
}]);

app.controller('UsuariosCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      //Falta hay q hacer lo de facebook 
      
  }]);
 

app.controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$localStorage', '$timeout', 'OpenFB','toaster','LoginAPI',
  function($rootScope, $scope, $routeParams, $location, $localStorage, $timeout, OpenFB, toaster,LoginAPI) {
	$rootScope.isLogged = $localStorage.isLogged || false;
	if($localStorage.user != null){
		$rootScope.es_anunciante = $localStorage.user.es_anunciante
	}else {
		$rootScope.es_anunciante = false;
	}
	$scope.location = $location;
	if($rootScope.isLogged){
		$location.path('/home');
	}

      	$scope.login = function () {
		//TODO: llamar al backend para solicitar id
		$rootScope.isLogged 	= true;
		LoginAPI.login($scope.user);
		toaster.pop('success', 'Hola '+$scope.user.nombre+',', 'Bienvenido a Apparta!', 10000, 'trustedHtml');

	};
	
        $scope.facebookLogin = function () {
            OpenFB.login('email,user_friends,user_birthday').then(
                function () {
			$scope.user = {};
			OpenFB.get('/me').success(function (user) {
				$scope.user.oauth_proveedor	= "facebook";
				$scope.user.nombre		= user.first_name;
				$scope.user.apellido		= user.last_name;
				$scope.user.email		= user.email;
				$scope.user.genero		= user.gender;
				$scope.user.oauth_id		= user.id;
				$scope.user.cumpleanos		= user.birthday;
				$scope.login();
			});
                },
                function () {
                    toaster.pop('error', "Error", 'No se pudo iniciar sesi&oacute;n', null, 'trustedHtml');
                });
        };


        $scope.defaultLogin = function () {
		$scope.user = {};
		$scope.user.oauth_proveedor	= "facebook";
		$scope.user.nombre		= "Bairon";
		$scope.user.apellido		= "Perez";
		$scope.user.email		= "baiper06@gmail.com";
		$scope.user.genero		= "male";
		$scope.user.oauth_id		= "1763484990";
		$scope.user.cumpleanos		= "01/01/1900";
		$scope.login();
        };

	$scope.googleLogin = function () {
		//Show the consent page
		$scope.googleapi.authorize({
		    client_id: '27926320656-mo7r2s49qgs12ebgfptq118mpdmh6ob2.apps.googleusercontent.com',
		    client_secret: 'QTFjl_-jkqKUiXrMxvRLkA4E',
		    redirect_uri: 'http://localhost',
		    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
		}).done(function() {
		    //Show the greet view if access is granted
		    $scope.callbackGoogle();
		}).fail(function(data) {
		    //Show an error message if access was denied
		   toaster.pop('error', "Error", 'No se pudo iniciar sesi&oacute;n', null, 'trustedHtml');
		});
	};

	$scope.googleapi =   {
	    setToken: function(data) {
		$scope.googleapi.access_token = data.access_token;
		$scope.googleapi.refresh_token = data.refresh_token || $scope.googleapi.refresh_token;
		var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
		$scope.googleapi.expires_at = expiresAt;
	    },
	    authorize : function (options) {
		var deferred = $.Deferred();
		var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
		    client_id: options.client_id,
		    redirect_uri: options.redirect_uri,
		    response_type: 'code',
		    scope: options.scope
		});
		//Open the OAuth consent page in the InAppBrowser
		var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

		authWindow.addEventListener('loadstart',
			function googleCallback(e){
			    var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
			    var code = /\?code=(.+)$/.exec(url);
			    var error = /\?error=(.+)$/.exec(url);

			    if (code || error) {
				//Always close the browser when match is found
				authWindow.close();
			    }

			    if (code) {
				//Exchange the authorization code for an access token
				$.post('https://accounts.google.com/o/oauth2/token', {
				    code: code[1],
				    client_id: options.client_id,
				    client_secret: options.client_secret,
				    redirect_uri: options.redirect_uri,
				    grant_type: 'authorization_code'
				}).done(function(data) {
				    $scope.googleapi.setToken(data);
				    deferred.resolve(data);
				}).fail(function(response) {
				    toaster.pop('error', "Error", 'No se pudo iniciar sesi&oacute;n', null, 'trustedHtml');
				    deferred.reject(response.responseJSON);
				});
			    } else if (error) {
				//The user denied access to the app
				deferred.reject({
				    error: error[1]
				});
			    }
			}
		);

		return deferred.promise();
	    },
	    getToken: function(options) {
		var deferred = $.Deferred();
		if (new Date().getTime() < $scope.googleapi.expires_at) {
		    deferred.resolve({
		        access_token: $scope.googleapi.access_token
		    });
		} else if ($scope.googleapi.refresh_token) {
		    $.post('https://accounts.google.com/o/oauth2/token', {
		        refresh_token: $scope.googleapi.refresh_token,
		        client_id: options.client_id,
		        client_secret: options.client_secret,
		        grant_type: 'refresh_token'
		    }).done(function(data) {
		        googleapi.setToken(data);
		        deferred.resolve(data);
		    }).fail(function(response) {
		        deferred.reject(response.responseJSON);
		    });
		} else {
		    deferred.reject();
		}
		return deferred.promise();
	    },
	    userInfo: function(options) {
		return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
	    }
	};

	$scope.callbackGoogle = function() {
		$scope.googleapi.getToken({
		    client_id: '27926320656-mo7r2s49qgs12ebgfptq118mpdmh6ob2.apps.googleusercontent.com',
		    client_secret: 'QTFjl_-jkqKUiXrMxvRLkA4E'
		}).then(function(data) {
		    //Pass the token to the API call and return a new promise object
		    return $scope.googleapi.userInfo({ access_token: data.access_token });
		}).done(function(user) {
		    //Display a greeting if the API call was successfull
			$scope.user = {};
			$scope.user.oauth_proveedor	= "google";
			$scope.user.nombre		= user.given_name;
			$scope.user.apellido		= user.family_name;
			$scope.user.email		= user.email;
			$scope.user.genero		= user.gender;
			$scope.user.oauth_id		= user.id;
			$scope.user.cumpleanos		= "01/01/1900";
			$scope.login();
		}).fail(function() {
		    toaster.pop('error', "Error", 'No se pudo iniciar sesi&oacute;n', null, 'trustedHtml');
		});
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


app.controller('ConfiguracionCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$localStorage','toaster',
  function($rootScope, $scope, $routeParams, $location, $localStorage, toaster) {
	$scope.user = $localStorage.user;
      	$scope.save = function () {
		$scope.user = $localStorage.user;
		$rootScope.es_anunciante = $scope.user.es_anunciante;
		toaster.pop('success', 'Genial!', 'Su informaci&oacute;n ha sido actualizado correctamente.', null, 'trustedHtml');
	};
  }]);
 

app.controller('BuscarUsuarioCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	$scope.results = [
	    {	id: 		'1',
		nombre: 	'Bairon',
		apellido: 	'Perez',
		oauth_id: 	'1763484990',
		oauth_proveedor: 'facebook'},
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

