(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(OAuthConfig);

    OAuthConfig.$inject = ['OAuthProvider', 'OAuthTokenProvider', 'appConfig'];

    function OAuthConfig(OAuthProvider, OAuthTokenProvider, appConfig) {

        OAuthProvider.configure({
            baseUrl: appConfig.API_SERVER_URL,
            clientId: 'CLIENT_ID',
            grantPath: '/oauth/token',
            revokePath: '/'
        });

        OAuthTokenProvider.configure({
            options: {
                secure: false,
                domain: appConfig.OAUTH_TOKEN_COOKIE_DOMAIN
            }
        });
    }

})();
