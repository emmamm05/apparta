app.service('ApartamentosAPIService', [
  function() {
    
    var url = "http://localhost/apartamentos/:apartamento_id";
    var Usuario = $resource(url, { apartamento_id: '@id'});
    
    this.READ = function( pApartamentoId ) {
	 return Usuario.get({ apartamento_id: pApartamentoId });
    
    this.CREATE = function( pApartamento) {
	 var apartamento = new Apartamento({
	    descripcion = pApartamento.descripcion;
	    direccion  	= pApartamento.direccion;
	    area 	= pApartamento.area;
	    latitud   	= pApartamento.latitud;
	    longitud   	= pApartamento.longitud;
	    cercaniaTEC = pApartamento.cercaniaTEC;
	 });
    }
    
    this.UPDATE = function( pApartamento ) {
       var usuario = Usuario.get( { pApartamento: pApartamentoId }, function()
       {
	    usuario.descripcion = pApartamento.descripcion;
	    usuario.direccion  	= pApartamento.direccion;
	    usuario.area 	= pApartamento.area;
	    usuario.latitud   	= pApartamento.latitud;
	    usuario.longitud   	= pApartamento.longitud;
	    usuario.cercaniaTEC = pApartamento.cercaniaTEC;
       });
    }
    
    this.DELETE = function( pApartamentoId ){
       Usuario.delete({usuario_id: pApartamentoId});      
    }
    
    this.SEARCH = function(){
       
    }    
}]);
