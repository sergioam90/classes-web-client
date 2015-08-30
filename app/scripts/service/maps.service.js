(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('MapsService', MapsService);

    MapsService.$inject = ['$q', 'GeoCoder'];

    function MapsService($q, GeoCoder) {

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

            var location = {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            };

            GeoCoder.geocode({location: location}).then(function (results) {
                deferred.resolve(results[0].formatted_address);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getLocality(place) {

            var deferred = $q.defer();

            // Search for locality name
            var localityName = '';

            // Search in address components
            for (var i = 0; i < place.address_components.length; i++) {
                if (localityName !== '') {
                    break;
                }

                // Search for locality in address_components types
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                    if (place.address_components[i].types[j] === 'locality') {
                        localityName = place.address_components[i].long_name;
                        break;
                    }
                }
            }

            // Geocode locality name
            GeoCoder.geocode({address: localityName}).then(success, error);

            function success(result) {
                console.log(result);
                deferred.resolve(result[0].place_id);
            }

            function error(error) {
                console.log(error);
                deferred.reject();
            }

            return deferred.promise;
        }

        return {
            getLocationName: getLocationName,
            getAddress: getAddress,
            getLocality: getLocality
        };
    }
})();