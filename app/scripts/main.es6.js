require('./vendor/angular');
require('./vendor/angular-ui-router');

require('./modules/noti');
require('./modules/routes');
require('./controllers/ApplicationController');

window.addEventListener('load', () => {
    angular.bootstrap(document, ['noti']);
});
