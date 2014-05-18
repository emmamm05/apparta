app.service('ApartamentosAPIService', [
  function() {
    
    var url = "http://localhost/apartamentos/:apartamento_id";
    var Usuario = $resource(url, { apartamento_id: '@id'});
    
    this.READ = function( pApartamentoId ) {
	 return Usuario.get({ apartamento_id: pApartamentoId });
    
    this.CREATE = function( pApartamento) {
	 var usuario = new Usuario({
	    nombre   = pApartamento.nombre;
	    email    = pApartamento.email;
	    oauth_id = pApartamento.oauth_id;
	    edad     = pApartamento.edad;
	    genero   = pApartamento.genero;
	 });
    }
    
    this.UPDATE = function( pApartamento ) {
       var usuario = Usuario.get( { pApartamento: pApartamentoId }, function()
       {
	    usuario.nombre = pApartamento.nombre;
	    usuario.edad   = pApartamento.edad;
	    usuario.genero = pApartamento.genero;
       });
    }
    
    this.DELETE = function( pApartamentoId ){
       Usuario.delete({usuario_id: pApartamentoId});      
    }
    
    this.SEARCH = function(){
       
    }    
}]);
