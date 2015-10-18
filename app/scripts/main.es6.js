require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');

require('./vendor/proposal-string-pad-left-right/polyfill');

angular.module('grepnet', ['ui.router']);

require('./routes');

require('./controllers/ApplicationController');
require('./directives/Task');
require('./filters/Seconder');
require('./services/Grep');
require('./services/Spawn');

window.addEventListener('load', () => {
    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(status => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    angular.bootstrap(document, ['grepnet']);
});
