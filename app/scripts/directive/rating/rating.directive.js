(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('rating', RatingDirective);

    function RatingDirective() {

        function link(scope, elem, attr){

            // TODO: Use states as string not as harcoded numbers?
            var fullStar = 0;
            var halfStar = 1;
            var emptyStar = 2;

            // TODO: Make style for grey text
            scope.defaultClasses = ['fa fa-star on', 'fa fa-star-half-o on', 'fa fa-star muted-text'];
            scope.defaultStates = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
            scope.states = scope.defaultStates.slice();
            scope.round = round;
            scope.starHover = starHover;
            scope.starLeave = starLeave;
            scope.starClick = starClick;

            initialize();

            /** Implementation **/

            function initialize(){

                if(!angular.isDefined(scope.statesClasses)){
                    scope.statesClasses = scope.defaultClasses.slice();
                }

                scope.$watch('value', function (newValue) {
                    updateStates(newValue);
                    scope.onChange();
                });

            }

            function updateStates(newValue){
                if(angular.isDefined(scope.discrete)){
                    updateStatesDiscrete(newValue);
                } else {
                    updateStatesHalf(newValue);
                }
            }

            function updateStatesDiscrete(newValue) {

                scope.states = scope.defaultStates.slice();

                var current = 0;
                for (var i = 0; i < scope.states.length; i++) {
                    if (newValue - 1 < i) {
                        current = 2;
                    }
                    scope.states[i] = current;
                }
            }

            function updateStatesHalf(newValue) {

                scope.states = scope.defaultStates.slice();

                // If newValue is not defined, leave default state
                if(newValue === undefined){
                    return;
                }

                newValue = round(newValue);

                var intValue = Math.floor(newValue);

                var i;
                for (i = 0; i < intValue; i++) {
                    scope.states[i] = fullStar;
                }

                var half = Math.ceil(newValue) !== Math.floor(newValue);

                if (half) {
                    scope.states[i++] = halfStar;
                }

                for (; i < scope.states.length; i++) {
                    scope.states[i] = emptyStar;
                }

            }

            /** Round half up with 0.5 precision **/
            function round(value) {
                var float = parseFloat(value);

                var decimal = Math.floor(float * 100) % 100;

                var sum = [0, 0.5, 0.5, 1];

                float = Math.floor(float) + sum[Math.floor(decimal / 25)];

                return float;
            }

            function starHover(index){
                if(!angular.isDefined(scope.readonly)){

                    // Fill up to index
                    for(var i = 0; i <= index; i++){
                        scope.states[i] = fullStar;
                    }

                    // Empty past index
                    for(var i = index + 1; i < scope.states.length; i++){
                        scope.states[i] = emptyStar;
                    }

                    setCurrentTitle(index + 1);
                }
            }

            function starLeave(){
                if(!angular.isDefined(scope.readonly)){
                    updateStatesHalf(scope.value);
                    setCurrentTitle(scope.value);
                }
            }

            function starClick(index, event){
                event.stopPropagation();
                if(!angular.isDefined(scope.readonly)){
                    if(scope.value !== index + 1) {
                        scope.value = index + 1;
                    } else {
                        scope.value = undefined;
                    }
                }
            }

            function setCurrentTitle(value) {
                if (angular.isDefined(scope.titles)) {
                    scope.currentTitle = scope.titles[value - 1];
                }
            }
        }

        return {
            restrict: 'E',
            scope: {
                value: '=ngModel',
                statesClasses: '=',
                readonly: '@',
                onChange: '&',
                discrete: '@',
                currentTitle: '=',
                titles: '='
            },
            templateUrl: 'scripts/directive/rating/rating.template.html',
            link: link
        };
    }
})();