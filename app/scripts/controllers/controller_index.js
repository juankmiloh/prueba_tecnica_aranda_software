angular.module("MyApp",[])
.controller("indexCtrl",function($scope,$http) {
	$scope.nombre = "probando angular!";

    //CARGAR VALORES DEL GENERO DEL LIBRO PARA PODER CARGARLOS EN EL SELECT GENERO
    $http.get("../json/json_libro_genero.php")
	.then(function(result) {
        console.log(result);
        $scope.datos_genero_libro = result.data;﻿
    }, function(result) {
        //some error
        console.log(result);
    });
});