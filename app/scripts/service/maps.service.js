(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('MapsService', MapsService);

    MapsService.$inject = ['$q'];

    function MapsService($q) {

        function getLocationName(placeId) {
            var deferred = $q.defer();

            // TODO: Don't hide the 'div'
            var mapsService = new google.maps.places.PlacesService(document.createElement('div'));
            var request = {placeId: placeId};

            mapsService.getDetails(request, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    deferred.resolve(place.name);
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        function getAddress(coordinates) {
            var deferred = $q.defer();

            var geocoder = new google.maps.Geocoder();

            // TODO: Harcoded location
            var latlng = new google.maps.LatLng(-38.7229407,-62.2685386);

            var request = {location: latlng};

            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    deferred.resolve(results[0].formatted_address);
                } else {
                    console.log('Geocoding failed. Status: ' + status);
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        return {
            getLocationName: getLocationName,
            getAddress: getAddress
        };
    }
})();