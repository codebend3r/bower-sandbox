/**
 * Livesite Angular SPA
 * this will define liveSiteApp
 */

(function () {

  'use strict';

  // SETTER for livesite module
  angular.module('livesite', ['ute.ui.livesite']);

  // GETTER and definition for livesite
  angular.module('livesite')
    .config(function (uteEndpointProvider, $translateProvider) {

      // configure endpoints so that we can use simplified urls
      uteEndpointProvider.setBaseUrl('http://ute-dev02.fido.ca:8080/html-fido/cms/content/ute/');
      uteEndpointProvider.setBasePath('api');
      uteEndpointProvider.setTeamsiteURL('http://sspprdhpts01/iw-cc/edit?vpath=//sspprdhpts01//');

      // read value passed down from cookie
      $translateProvider.preferredLanguage('en');

    })
    .run(function (uteLocale, amMoment) {

      // set moment
      amMoment.changeLocale(uteLocale.locale());

    })
    .controller('livesiteCtrl', function () {

      console.log('Autobots... roll out!');

    });

})();