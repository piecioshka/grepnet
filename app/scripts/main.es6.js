require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');

require('./modules/noti');
require('./modules/routes');
require('./controllers/ApplicationController');

window.addEventListener('load', () => {
    angular.bootstrap(document, ['noti']);
});
