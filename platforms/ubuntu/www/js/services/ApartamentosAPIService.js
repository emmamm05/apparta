app.service('ApartamentosAPIService', [ '$resource'
  function($resource) {
    
    var root = "http://localhost:8080/api";
    var url = root + "/apartamentos/:apartamento_id";
    var Apartamento = $resource(url, { apartamento_id: '@id'});
    console.debug("ApartamentosAPIService1");
    
    this.READ = function( pApartamentoId ) {
	 return Apartamento.get({ apartamento_id: pApartamentoId });
    };
    console.debug("ApartamentosAPIService2");
    
    this.CREATE = function( pApartamento) {
	 var apartamento = new Apartamento({
	    descripcion         : pApartamento['descripcion'],
	    direccion_fisica  	: pApartamento['direccion_fisica'],
	    area 	        : pApartamento['area'],
	    ubicacion_latitud  	: pApartamento['latitud'],
	    ubicacion_longitud 	: pApartamento['longitud'],
	    cercaniaTEC 	: pApartamento['cercaniaTEC'],
	    mensualidad		: pApartamento['mensualidad'],
	    habitaciones	: pApartamento['habitaciones'],
	    titulo		: pApartamento['titulo'],
	    genero		: pApartamento['genero'],
	    opcion_agua		: pApartamento['opcion_agua'],
	    opcion_electricidad : pApartamento['opcion_electricidad'],
	    opcion_internet     : pApartamento['opcion_internet'],
	    opcion_seguridad    : pApartamento['opcion_seguridad']
	 });
    };
    console.debug("ApartamentosAPIService3");
    
    this.UPDATE = function( pApartamento ) {
       var apartamento = Apartamento.get( { pApartamento: pApartamentoId }, function()
       {
	    apartamento.descripcion = pApartamento.descripcion;
	    apartamento.direccion  	= pApartamento.direccion;
	    apartamento.area 		= pApartamento.area;
	    apartamento.latitud   	= pApartamento.latitud;
	    apartamento.longitud   	= pApartamento.longitud;
	    apartamento.cercaniaTEC = pApartamento.cercaniaTEC;
	    apartamento.descripcion         = pApartamento.descripcion;
	    apartamento.direccion_fisica  	= pApartamento.direccion_fisica;
	    apartamento.area 	    	= pApartamento.area;
	    apartamento.ubicacion_latitud  	= pApartamento.latitud;
	    apartamento.ubicacion_longitud 	= pApartamento.longitud;
	    apartamento.cercaniaTEC 	= pApartamento.cercaniaTEC;
	    apartamento.mensualidad		= pApartamento.mensualidad;
	    apartamento.habitaciones	= pApartamento.habitaciones;
	    apartamento.titulo		= pApartamento.titulo;
	    apartamento.genero		= pApartamento.genero;
	    apartamento.opcion_agua		= pApartamento.opcion_agua;
	    apartamento.opcion_electricidad = pApartamento.opcion_electricidad;
	    apartamento.opcion_internet     = pApartamento.opcion_internet;
	    apartamento.opcion_seguridad    = pApartamento.opcion_seguridad;
       });
    };
    
    this.DELETE = function( pApartamentoId ){
       Apartamento.delete({apartamento_id: pApartamentoId});      
    };
    
    this.SEARCH = function( pApartamento ){
       $http({method: 'GET', url: '/someUrl', params: {} }).
	success(function(data, status, headers, config) {
	  // this callback will be called asynchronously
	  // when the response is available
	  
	}).
	error(function(data, status, headers, config) {
	  // called asynchronously if an error occurs
	  // or server returns response with an error status.
	});       
    };    
}]);
