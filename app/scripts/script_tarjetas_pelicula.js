$(document).ready(function(){
	click_img_search();
	click_img_setup();
	click_img_videos();
});

// FUNCION QUE SE EJECUTA CUANDO SE HACE CLICK EN LA IMAGEN DE BUSCAR
function click_img_search() {
	$("#img_search").click(function(){
		if( $('.container-input-search').is(":visible") ){ //esta visible
			//si esta visible
			// $('.container-input-search').hide("slow"); //esconder
		}else{
			//si no esta visible
			$('.container-input-search').show("slow"); //mostrar
			$('#busqueda').focus();
			$('#busqueda').val("");
		}
  	});
}

// FUNCION QUE SE EJECUTA CUANDO SE HACE CLICK EN LA IMAGEN DE CONFIGURACION
function click_img_setup() {
	$("#img_setup").click(function(){
  		swal(
			'Información',
			'Opciones de configuración en desarrollo!',
			'info'
        );
  	});
}

// FUNCION QUE SE EJECUTA CUANDO SE HACE CLICK EN LA IMAGEN DE VIDEOS QUE ESTA FIJA AL BORDE LATERAL
function click_img_videos() {
	$("#img_videos").click(function(){
		swal(
			'Información',
			'Esta sección se encuentra en desarrollo!',
			'info'
        );
  	});
}

// FUNCION QUE SE EJECUTA CUANDO SE PIERDE EL FOCO DEL INPUT DE BUSQUEDA
function perdio_foco() {
	$('.container-input-search').hide("slow"); //esconder
}