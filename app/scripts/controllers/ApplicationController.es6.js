angular.module('noti').controller('ApplicationController', ($scope, $state) => {
    let tasks = [{
        title: 'Check new YouTube movie',
        url: 'http://youtube.com/warsawjs',
        phrase: '/warsaw #14 invitation/',
        interval: '5:00'
    }];

    $scope.add = (title, url, phrase, interval) => {
        tasks.unshift({ title, url, phrase, interval });
        $state.go('list-of-tasks');
    };

    $scope.remove = $index => {
        tasks.splice($index, 1);
    };

    $scope.tasks = tasks;
});
