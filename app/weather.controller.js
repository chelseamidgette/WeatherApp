(function() {
    'use strict';

    angular
        .module('myApp', ['ngAnimate', 'toastr'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherFactory', 'toastr', '$scope'];

    /* @ngInject */
    function WeatherController(WeatherFactory, toastr, $scope) {
        var vm = this;
        vm.title = 'WeatherController';
        vm.cityName;
        vm.cityData;
        vm.searchHistory = [];
        vm.getWeather = getWeather;

        ////////////////

        function addrow(data) {
        	vm.searchHistory.push({name: data.name, temp: data.main.temp, date: new Date()})
        };

        function getWeather() {

        	WeatherFactory.getWeather(vm.city).then(
        		function(response) {

        			// bind weather data for the main display
        			vm.weather = response.data;
        			

        			// call add row to update the weather history array
        			addrow(response.data);
        			toastr.success('We have weather!');
        			console.log(response.data);


        		},
        		function(error) {
        			if (error.data) {
        				toastr.error('There was a problem: ' + error.data);
        			} else {
        				toastr.info('no data found :(');
        			}
        		}


        	)
        }
    }
})();