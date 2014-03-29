angular.module('starter.controllers', ['firebase','ionic'])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, $firebase, $ionicLoading) {

	$scope.loading = $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 200
	});

	var ref = new Firebase('https://popping-fire-250.firebaseio.com/playlists');
	$scope.playlists = $firebase(ref);

	$scope.playlists.$on("loaded", function() {
		console.log("Datos cargados!");
		$scope.loading.hide();
	})

	/*$scope.playlists.$on("change", function() {
		console.log("Cargando datos...");
	});*/

})

.controller('PlaylistCtrl', function($scope, $stateParams, $firebase, $ionicLoading) {

	$scope.error = '';

	$scope.loading = $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 200
	});

	console.log('playlistId: ' + $stateParams.playlistId);
	var ref = new Firebase('https://popping-fire-250.firebaseio.com/playlists/' + ($stateParams.playlistId-1));
	$scope.playlist = $firebase(ref);

  if(!$scope.playlist.title)
	{
		console.log("Error!");
		$scope.error = 'Oops! Algo salió mal... intenta de nuevo';
		$scope.loading.hide();
	}
	else
	{
		$scope.playlist.$on("loaded", function() {
			$scope.loading.hide();
		})
	}

})
