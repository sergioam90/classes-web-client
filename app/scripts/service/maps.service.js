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
            var latlng = new google.maps.LatLng(-38.7229407, -62.2685386);

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

        function createMap(center, mapId, inputId) {

            var mapOptions = {
                center: center,
                zoom: 8
            };

            // Create the map
            var mapCanvas1 = new google.maps.Map(document.getElementById(inputId), mapOptions);

            // Create the address autocomplete field
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById(inputId));

            autocomplete.bindTo('bounds', mapCanvas1);

            var infowindow = new google.maps.InfoWindow();

            var marker = new google.maps.Marker({
                map: mapCanvas1,
                anchorPoint: new google.maps.Point(0, -29)
            });

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                // Close info windows and hide marker
                infowindow.close();
                marker.setVisible(false);

                // Get place
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    mapCanvas1.fitBounds(place.geometry.viewport);
                } else {
                    mapCanvas1.setCenter(place.geometry.location);
                    mapCanvas1.setZoom(17);  // Why 17? Because it looks good.
                }

                // Set marker
                marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                $scope.$apply(function () {
                    vm.LatLng = place.geometry.location;
                });

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(vm.mapCanvas1, marker);
            });
        }

        return {
            getLocationName: getLocationName,
            getAddress: getAddress,
            createMap: createMap
        };
    }
})();
