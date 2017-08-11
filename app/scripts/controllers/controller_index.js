angular.module("MyApp",['infinite-scroll'])
.controller("indexCtrl",function($scope,$http) {

	// FUNCION QUE SE EJECUTA CUANDO SE DA CLICK A LA IMAGEN DE BUSCAR
	$scope.buscarPelicula = function() {
		// swal($scope.busqueda);
		var busqueda = $scope.busqueda;
		$scope.buscarPorNombre(busqueda);
	}

	// FUNCION QUE PERMITE LISTAR LAS PRIMERAS (9) PELICULAS DE LA BUSQUEDA
	$scope.buscarPorNombre = function(nombre_peli) {
		if ($scope.busqueda != undefined || nombre_peli=="a") {
			$scope.lista_peliculas = [];
			$scope.peliculas = [];
			var url = "https://api.themoviedb.org/3/search/tv?api_key=b2907782d07859a652052d3bae537475&query="+nombre_peli;
			$http.get(url).then(function(result) {
		        console.log(result);
		        $scope.cantidad_pelis = result.data.results.length;
		        if ($scope.cantidad_pelis != 0) {
			        $scope.lista_peliculas = result.data.results;﻿
			        for(var i = 0; i < 9; i++) { //LISTAR LAS PRIMERAS 9
			        	if ($scope.lista_peliculas[i] != undefined) {
			        		$scope.peliculas.push($scope.lista_peliculas[i]);
			        	}
					}
					console.log($scope.peliculas);
		        }else{
		        	swal(
						'Error.',
						'No existe información de su búsqueda!',
						'error'
			        );
		        }
		    }, function(result) {
		        //some error
		        console.log(result);
		    });
		}
	}

	// FUNCION QUE SE EJECUTA CUANDO SE HACE INFINITE SCROLL
	$scope.cargarMasPeliculas = function() {
		console.log($scope.cantidad_pelis);
		// var last = $scope.peliculas[$scope.peliculas.length - 1];
		// for(var i = 1; i <= 9; i++) {
		// 	$scope.peliculas.push(last + i);
		// }
	};
});