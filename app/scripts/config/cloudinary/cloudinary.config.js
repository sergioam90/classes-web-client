(function() {
    'use strict';

    angular
        .module('classesClientApp')
        .config(CloudinaryConfig);

    function CloudinaryConfig() {
        // TODO: set definitive cloud name
        $.cloudinary.config('cloud_name', 'dkmgfp117');  // TODO: should use a constant?
    }
})();
