const MILLISECONDS_IN_SECOND = 1000;

/**
 * @param {Object} $http
 * @param {string} url
 * @param {string} phrase
 * @returns {Promise}
 */
function grep($http, url, phrase) {
    console.log('grep:', url, phrase);

    return $http.post('http://localhost:3000', {
        url: url,
        phrase: phrase
    }).then(response => {
        return {
            status: Boolean(response.data.status)
        };
    });
}

/**
 * @param {string} title
 * @param {string} url
 * @param {number} interval
 * @returns {*}
 */
function spawn(title, url, interval) {
    console.info('spawn:', title, url);
    clearInterval(interval);
    return;

    if (window.Notification && Notification.permission === 'granted') {
        return new Notification(`'${title}' completed!`, {
            body: `We found your phrase. Please visit your URL: ${url}.`,
            icon: './images/gear-64x64.png'
        });
    }
}

angular.module('grepnet').controller('ApplicationController', ($scope, $state, $http) => {
    let tasks = [];

    $scope.add = ({ title, url, phrase, delay }) => {
        let interval = null;
        let status = 'new';

        interval = setInterval(() => {
            grep($http, url, phrase).then(response => {
                console.log('... status:', response.status);
                if (response.status) {
                    status = 'completed';
                    spawn(title, url, interval);
                }
            });
        }, delay * MILLISECONDS_IN_SECOND);

        tasks.unshift({
            title,
            url,
            phrase,
            delay,
            interval,
            status
        });
        $state.go('list-of-tasks');
    };

    $scope.pause = $index => {
        let task = tasks[$index];

        console.info('Try to pause task "%s"', task.title);
        clearInterval(task.interval);
    };

    $scope.remove = $index => {
        $scope.pause($index);
        let task = tasks.splice($index, 1);

        console.warn('Task "%s" removed!', task[0].title);
    };

    $scope.isCompleted = ($index) => {
        return tasks[$index].status === 'completed';
    };

    $scope.tasks = tasks;

    // TODO(piecioshka): Below is for development. Remove before publish.

    $scope.add({
        title: 'Is recent item exist?',
        url: 'https://www.google.com/search?q=test',
        phrase: 'test',
        delay: 2
    });
});
