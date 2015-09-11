(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('myPagination', PaginationDirective);

    PaginationDirective.$inject = [];

    function PaginationDirective() {

        function link(scope) {

            scope.getUrl = function (number) {
                var target = scope.targetUrl;

                // TODO: Check this!

                // Remove current page parameters query string
                target = target.replace(/(&?page=[^&])&?/gm, '');

                return target + '&page=' + number;
            };

            scope.next = function () {
                if (scope.page.last) {
                    return '';
                }

                scope.pageSelect({number: scope.page.number + 1});
            };

            scope.previous = function () {
                if (scope.page.first) {
                    return '';
                }

                scope.pageSelect({number: scope.page.number - 1});
            };

            scope.range = function () {
                return generatePagesArray(
                    scope.page.number,
                    scope.page.totalElements,
                    scope.page.size,
                    scope.maxShown);
            };

            /** The following functions were taken from angularUtils **/

            function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
                var pages = [];
                var totalPages = Math.ceil(collectionLength / rowsPerPage);
                var halfWay = Math.ceil(paginationRange / 2);
                var position;

                if (currentPage <= halfWay) {
                    position = 'start';
                } else if (totalPages - halfWay < currentPage) {
                    position = 'end';
                } else {
                    position = 'middle';
                }

                var ellipsesNeeded = paginationRange < totalPages;
                var i = 1;
                while (i <= totalPages && i <= paginationRange) {
                    var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                    var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                    var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));

                    if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                        pages.push(-1);
                    } else {
                        pages.push(pageNumber);
                    }
                    i++;
                }
                return pages;
            }

            function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
                var halfWay = Math.ceil(paginationRange / 2);
                if (i === paginationRange) {
                    return totalPages;
                } else if (i === 1) {
                    return i;
                } else if (paginationRange < totalPages) {
                    if (totalPages - halfWay < currentPage) {
                        return totalPages - paginationRange + i;
                    } else if (halfWay < currentPage) {
                        return currentPage - halfWay + i;
                    } else {
                        return i;
                    }
                } else {
                    return i;
                }
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/pagination/pagination.template.html',
            scope: {
                targetUrl: '@',
                page: '=ngModel',
                pageSelect: '&',
                maxShown: '='
            },
            link: link
        };
    }
})();