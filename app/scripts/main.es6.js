require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');

require('./vendor/proposal-string-pad-left-right/polyfill');

angular.module('grep', ['ui.router']);

require('./modules/routes');
require('./controllers/ApplicationController');
require('./services/Checker');
require('./filters/Seconder');

window.addEventListener('load', () => {
    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    angular.bootstrap(document, ['grep']);
});
