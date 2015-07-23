(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('MapsService', MapsService);

    MapsService.$inject = ['$q'];

    function MapsService($q) {


        function getLocationName(placeId) {
            var deferred = $q.defer();

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

        return {
            getLocationName: getLocationName
        };
    }
})();