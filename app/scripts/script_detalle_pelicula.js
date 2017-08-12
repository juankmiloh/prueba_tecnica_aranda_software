$(document).ready(function(){
	click_img_back();
});

// FUNCION QUE SE EJECUTA CUANDO SE HACE CLICK A LA IMAGEN DE VOLVER A LA PAGINA ANTERIOR
function click_img_back() {
	$("#img_btn_back").click(function(){
		$('.container-tarjetas-pelicula').show(); //mostrar
		$('.container-btn-back').hide(); //esconder
		$('.container-detalle-pelicula').hide(); //esconder
  	});
}