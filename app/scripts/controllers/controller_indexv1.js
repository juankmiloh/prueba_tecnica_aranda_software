angular.module("MyApp",['ngAnimate','ngSanitize','mgcrea.ngStrap','infinite-scroll'])
.controller("indexCtrl",function($scope,$http) {

	// FUNCION QUE SE EJECUTA CUANDO SE DA CLICK A LA IMAGEN DE BUSCAR
	$scope.buscarPelicula = function() {
		// swal($scope.busqueda);
		// $('.container-btn-back').hide("slow"); //esconder
		// $('.container-detalle-pelicula').hide("slow"); //esconder
		var busqueda = $scope.busqueda;
		var arroba = /@/;
		var numeral = /#/;
		if (arroba.test(busqueda) || numeral.test(busqueda)) {
			swal(
				'Error.',
				'No se aceptan caracteres de tipo: "@" "#"',
				'error'
	        );
	        $scope.busqueda="";
		}else{
			$scope.peliculas = [];
			$scope.contador_paginas = 0;
			$scope.buscarPorNombre(busqueda,1,true);
		}
	}

	$scope.peliculas = [];
	$scope.contador_paginas = 0;
	// FUNCION QUE PERMITE LISTAR LAS PRIMERAS (9) PELICULAS DE LA BUSQUEDA
	$scope.buscarPorNombre = function(nombre_peli,pagina,scroll) {
		if ($scope.busqueda != undefined || nombre_peli=="a") {
			$scope.nombre_peli_busqueda = nombre_peli;
			$scope.busqueda="";
			$scope.pagina_actual = pagina;
			$scope.lista_peliculas = [];
			var url = "https://api.themoviedb.org/3/search/tv?api_key=b2907782d07859a652052d3bae537475&query="+nombre_peli+"&page="+pagina;
			$http.get(url).then(function(result) {
		        // console.log(result);
		        $scope.total_paginas = result.data.total_pages;
		        $scope.cantidad_pelis_pagina = result.data.results.length;
		        if ($scope.cantidad_pelis_pagina != 0 && scroll != false) {
		        	$('.container-btn-back').hide("slow"); //esconder
		        	$('.container-detalle-pelicula').hide("slow"); //esconder
		        	$('.container-tarjetas-pelicula').show("slow"); //mostrar
		        	$scope.pelis_pagina = 0;
		        	$scope.contador_paginas += 1;
			        $scope.lista_peliculas = result.data.results;﻿
			        for(var i = 0; i < 9; i++) { //LISTAR LAS PRIMERAS 9
			        	if ($scope.lista_peliculas[i] != undefined) {
			        		$scope.peliculas.push($scope.lista_peliculas[i]);
			        		$scope.pelis_pagina += 1;
			        	}
					}
					// console.log($scope.peliculas);
		        }else{
		        	if (scroll != false) {
		        		swal(
							'Error.',
							'No existe información para su búsqueda!',
							'error'
				        );
				        $scope.busqueda="";
		        	}
		        }
		    }, function(result) {
		        //some error
		        console.log(result);
		    });
		}
	}

	// FUNCION QUE SE EJECUTA CUANDO SE HACE INFINITE SCROLL PERMITIENDO CARGAR LAS DEMAS PELICULAS POR PAGINA
	$scope.cargarMasPeliculas = function() {
		console.log("CANTIDAD DE PAGINAS -> "+$scope.total_paginas);
		console.log("PAGINA ACTUAL -> "+$scope.pagina_actual);
		console.log("CONTADOR DE PAGINAS -> "+$scope.contador_paginas);
		console.log("CANTIDAD PELICULAS POR PAGINA -> "+$scope.cantidad_pelis_pagina);
		console.log("CANTIDAD DE PELICULAS CARGADAS EN PAGINA-> "+$scope.pelis_pagina);
		console.log("--------------------------------------------------------");

		if ($scope.pelis_pagina < $scope.cantidad_pelis_pagina) {
			for(var i = $scope.pelis_pagina; i < $scope.cantidad_pelis_pagina; i++) { //LISTAR LAS RESTANTES
	        	if ($scope.lista_peliculas[i] != undefined) {
	        		$scope.peliculas.push($scope.lista_peliculas[i]);
	        		$scope.pelis_pagina += 1;
	        	}
			}
		}else{
			if ($scope.contador_paginas < $scope.total_paginas) {
				$scope.contador_paginas += 1;
				$scope.buscarPorNombre($scope.nombre_peli_busqueda,$scope.contador_paginas,true);
			}
		}
	};

	// FUNCION QUE SE EJECUTA CUANDO SE HACE ROLL OVER SOBRE LA PELICULA
	$scope.buscar_actores = function(id_pelicula) {
		// console.log(id_pelicula);
		$scope.lista_actores = [];
		$scope.actores = "";
		var url = "https://api.themoviedb.org/3/tv/"+id_pelicula+"/credits?api_key=b2907782d07859a652052d3bae537475";
		$http.get(url).then(function(result) {
	        // console.log(result.data.cast[0]);
	        $scope.lista_actores = result.data.cast;﻿
	        for (var i = 0; i < 3; i++) {
	        	if ($scope.lista_actores[i] != undefined) {
	        		$scope.actores += " / " + $scope.lista_actores[i].name;
	        	}
	        }
	        if ($scope.lista_actores.length == 0) {
	        	$scope.actores += "/ No registran /";
	        }
	    }, function(result) {
	        //some error
	        console.log(result);
	    });
	}

	// FUNCION QUE SE EJECUTA CUANDO SE HACE DOBLE CLICK EN LA PELICULA PERMITIENDO CAPTURA EL ID DE LA PELICULA
	$scope.ver_detalle = function(id_pelicula) {
		// alert(id_pelicula);
		$scope.buscarPorNombre(false,false,false); //SE LLAMA PARA CONTROLAR EL INFINITE SCROLL
		$('.container-tarjetas-pelicula').hide("slow"); //esconder
		$('.container-btn-back').show("slow"); //mostrar
		$('.container-detalle-pelicula').show("slow"); //mostrar
		$scope.id_detalle = id_pelicula;
		$scope.cargar_datos_detalle(id_pelicula);
	}

	$scope.cargar_datos_detalle = function(id_pelicula) {
		// console.log(id_pelicula);
		$scope.lista_datos = [];
		$scope.lista_temporadas = [];
		$scope.temporadas = [];
		$scope.actores = "";
		var url = "https://api.themoviedb.org/3/tv/"+id_pelicula+"?api_key=b2907782d07859a652052d3bae537475";
		$http.get(url).then(function(result) {
	        // console.log(result.data);
	        $scope.data = result.data;
	        $scope.foto_detalle = $scope.data.backdrop_path;
	        if ($scope.foto_detalle == null) {
	        	$scope.foto_detalle = $scope.data.poster_path;
	        }
	        $scope.nombre_detalle = $scope.data.name;
	        $scope.nombre_detalle = $scope.nombre_detalle.toUpperCase();

	        $scope.numero_temporadas = $scope.data.seasons.length;
	        $scope.lista_temporadas = $scope.data.seasons;
	        for (var i = 1; i < $scope.numero_temporadas; i++) {
	        	$scope.temporadas.push($scope.lista_temporadas[i]);
	        }
	        // console.log($scope.temporadas);
	    }, function(result) {
	        //some error
	        console.log(result);
	    });
	    $scope.cargar_temporada(1);
	}

	$scope.cargar_temporada = function(temporada) {
		// console.log(temporada);
		var id_pelicula = $scope.id_detalle; //DESCOMENTARIAR ESTA LINEA PARA PRODUCCION
		// alert(id_pelicula);
		// var id_pelicula = 2691; //COMENTARIAR ESTA LINEA PARA PRUEBAS
		$scope.lista_episodios = [];
		$scope.episodios = [];
		var url = "https://api.themoviedb.org/3/tv/"+id_pelicula+"/season/"+temporada+"?api_key=b2907782d07859a652052d3bae537475";
		$http.get(url).then(function(result) {
	        // console.log(result.data);
	        $scope.numero_episodios = result.data.episodes.length;
	        $scope.lista_episodios = result.data.episodes;
	        for (var i = 0; i < $scope.numero_episodios; i++) {
	        	$scope.episodios.push($scope.lista_episodios[i]);
	        }
	        console.log($scope.episodios);
	        for (var i = 1; i < $scope.numero_temporadas; i++) {
	        	if (temporada==i) {
	        		$("#temporada_"+i+"").addClass("active");
	        	}else{
	        		$("#temporada_"+i+"").removeClass("active");
	        	}
	        }
	    }, function(result) {
	        //some error
	        console.log(result);
	    });
	}

});
