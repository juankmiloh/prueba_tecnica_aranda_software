$(document).ready(function(){
	$("#img_search").click(function(){
		if( $('.container-input-search').is(":visible") ){ //esta visible
			//si esta visible
			$('.container-input-search').hide("slow"); //esconder
		}else{
			//si no esta visible
			$('.container-input-search').show("slow"); //mostrar
			$('#busqueda').focus();
		}
  	});

  	$("#img_setup").click(function(){
  		swal(
			'Información',
			'Opciones de configuración en desarrollo!',
			'info'
        );
  	});
});