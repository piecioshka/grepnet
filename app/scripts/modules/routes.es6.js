angular.module('noti').config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('list-of-tasks', {
        url: '/list',
        templateUrl: 'templates/list-of-tasks.html'
    });

    $stateProvider.state('add-task', {
        url: '/add',
        templateUrl: 'templates/add-task.html'
    });

    $urlRouterProvider.otherwise('list');
});
