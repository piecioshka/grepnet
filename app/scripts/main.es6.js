require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');

require('./vendor/proposal-string-pad-left-right/polyfill');

let mod = angular.module('grepnet', ['ui.router']);

mod.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('list-of-tasks', {
        url: '/list',
        templateUrl: 'templates/list-of-tasks.html'
    });

    $stateProvider.state('add-task', {
        url: '/add',
        templateUrl: 'templates/update-task.html',
        controller: ($scope) => {
            $scope.mode = 'add';
        }
    });

    $stateProvider.state('edit-task', {
        url: '/edit/:index',
        templateUrl: 'templates/update-task.html',
        controller: ($scope, $state, $stateParams, tasks) => {
            let task = tasks.at($stateParams.index);

            if (!task) {
                $state.go('list-of-tasks');
                return;
            }

            $scope.title = task.title;
            $scope.url = task.url;
            $scope.phrase = task.phrase;
            $scope.delay = task.delay;

            $scope.mode = 'edit';
        }
    });

    $urlRouterProvider.otherwise('list');
});

import ApplicationController from './controllers/ApplicationController';
import TaskDirective from './directives/Task';
import SeconderFilter from './filters/Seconder';
import GrepFactory from './services/GrepFactory';
import SpawnFactory from './services/SpawnFactory';
import TasksFactory from './services/TasksFactory';

mod.controller('ApplicationController', ApplicationController);
mod.directive('task', TaskDirective);
mod.filter('seconder', SeconderFilter);
mod.service('grep', GrepFactory);
mod.service('spawn', SpawnFactory);
mod.service('tasks', TasksFactory);

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
