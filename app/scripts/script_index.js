$(document).ready(function(){
	click_img_search();
	click_img_setup();
	click_img_videos();
	// mouse_hover_div_pelicula();
});

function click_img_search() {
	$("#img_search").click(function(){
		if( $('.container-input-search').is(":visible") ){ //esta visible
			//si esta visible
			// $('.container-input-search').hide("slow"); //esconder
		}else{
			//si no esta visible
			$('.container-input-search').show("slow"); //mostrar
			$('#busqueda').focus();
		}
  	});
}

function click_img_setup() {
	$("#img_setup").click(function(){
  		swal(
			'Información',
			'Opciones de configuración en desarrollo!',
			'info'
        );
  	});
}

function click_img_videos() {
	$("#img_videos").click(function(){
		swal(
			'Información',
			'Esta sección se encuentra en desarrollo!',
			'info'
        );
  	});
}

function mouse_hover_div_pelicula() {
	$(".prueba").hover(function() { //entra el mouse 
		// alert("entra");
	    $(".container-titulo").addClass("container-titulo-hover");
	    $(".texto-titulo").addClass("texto-titulo-hover");
	    $(".container-titulo").removeClass("container-titulo");
	    $(".texto-titulo").removeClass("texto-titulo");
	  }, function() { //se quita el mouse
	    $(".container-titulo").addClass("container-titulo");
	    $(".texto-titulo").addClass("texto-titulo");
	    $(".container-titulo").removeClass("container-titulo-hover");
	    $(".texto-titulo").removeClass("texto-titulo-hover");
	  }
	);
}