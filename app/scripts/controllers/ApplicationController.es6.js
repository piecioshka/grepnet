const MILLISECONDS_IN_SECOND = 1000;

angular.module('grep').controller('ApplicationController', ($scope, $state, Checker) => {
    let tasks = [{
        title: 'Check new YouTube movie',
        url: 'http://youtube.com/warsawjs',
        phrase: '/warsaw #14 invitation/i',
        delay: 241
    }];

    $scope.add = (title, url, phrase, delay) => {
        let interval = null;
        let spawn = () => {
            if (window.Notification && Notification.permission === 'granted') {
                clearInterval(interval);

                return new Notification(`In task '${title}' we match the phrase!`, {
                    body: `NotiGear found phrase under passed URL. Please visit ${url} to confirm our results.`,
                    icon: './images/gear-64x64.png'
                });
            }
        };

        interval = setInterval(() => {
            Checker.check(url, phrase).then(spawn);
        }, delay * MILLISECONDS_IN_SECOND);

        tasks.unshift({ title, url, phrase, delay, interval });
        $state.go('list-of-tasks');
    };

    $scope.pause = $index => {
        let task = tasks[$index];

        console.log('Try to pause task: ', task);

        clearInterval(task.interval);
    };

    $scope.remove = $index => {
        tasks.splice($index, 1);
    };

    $scope.tasks = tasks;
});
