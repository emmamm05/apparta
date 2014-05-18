app.service('UsuariosAPIService', [
  function() {
    
    var url = "http://localhost/usuarios/:usuario_id";
    var Usuario = $resource(url, {usuario_id: '@id'});
    
    this.READ = function( pUsuarioId ) {
	 return Usuario.get({ usuario_id: pUsuarioId });
    
    this.CREATE = function( pUsuario) {
	 var usuario = new Usuario({
	    nombre = pUsuario.nombre;
	    email = pUsuario.email;
	    oauth_id = pUsuario.oauth_id;
	    edad = pUsuario.edad;
	    genero = pUsuario.genero;
	 });
    }
    
    this.UPDATE = function( pUsuario ) {
       var usuario = Usuario.get({usuarioId: pUsuarioId }, function()
       {
	    usuario.nombre = pUsuario.nombre;
	    usuario.edad = pUsuario.edad;
	    usuario.genero = pUsuario.genero;
       });
    }
    
    this.DELETE = function( pUsuarioId ){
       Usuario.delete({usuario_id: pUsuarioId});      
    }
    
    this.SEARCH = function(){
       
    }    
}]);
 

