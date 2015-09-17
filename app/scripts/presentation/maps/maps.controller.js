(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MapsController', MapsController);

    MapsController.$inject = ['$scope'];

    function MapsController($scope) {
        var vm = this;

        /******************* Map 1 *******************/

        vm.LatLng = '';

        var mapOptions = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        };

        vm.mapCanvas1 = new google.maps.Map(document.getElementById('mapCanvas1'), mapOptions);

        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('input1'));

        autocomplete.bindTo('bounds', vm.mapCanvas1);

        var infowindow = new google.maps.InfoWindow();

        var marker = new google.maps.Marker({
            map: vm.mapCanvas1,
            anchorPoint: new google.maps.Point(0, -29)
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                vm.mapCanvas1.fitBounds(place.geometry.viewport);
            } else {
                vm.mapCanvas1.setCenter(place.geometry.location);
                vm.mapCanvas1.setZoom(17);  // Why 17? Because it looks good.
            }
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

        /******************* Map 2 *******************/

        vm.address = {lat: -32.397, lng: -62};

        var mapOptions2 = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        };

        vm.mapCanvas2 = new google.maps.Map(document.getElementById('mapCanvas2'), mapOptions2);

        var addressMarker = new google.maps.Marker({
            map: vm.mapCanvas2,
            position: vm.address,
            visible: true
        });

        vm.mapCanvas2.setCenter(vm.address);
        //vm.mapCanvas2.setZoom(17);

        /******************* Map 3 *******************/

        vm.selectedTeacher = {};

        var teachers = [
            {
                name: 'Messi',
                address: {lat: -30.0001, lng: -62.0001}
            },
            {
                name: 'Diego',
                address: {lat: -30.02, lng: -62.01}
            },
            {
                name: 'Carlitos',
                address: {lat: -30.01, lng: -62.02}
            },
            {
                name: 'Kun',
                address: {lat: -30.02, lng: -62.02}
            }
        ];

        var mapOptions3 = {
            center: {lat: -30.02, lng: -62.01},
            zoom: 8
        };

        vm.mapCanvas3 = new google.maps.Map(document.getElementById('mapCanvas3'), mapOptions3);

        angular.forEach(teachers, function (teacher) {
            var marker = new google.maps.Marker({
                map: vm.mapCanvas3,
                position: teacher.address,
                teacher: teacher,
                visible: true
            });
            google.maps.event.addListener(marker, 'click', function () {
                $scope.$apply(function () {
                    vm.selectedTeacher = marker.teacher;
                });
            });
        });
    }
})();
