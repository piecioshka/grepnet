const MILLISECONDS_IN_SECOND = 1000;

/**
 * @param {Object} $http
 * @param {string} url
 * @param {string} phrase
 * @returns {Promise.<T>|*}
 */
function grep($http, url, phrase) {
    console.log('grep', url, phrase);

    let regexp = new RegExp(phrase);

    return $http.get(url).then(response => {
        return regexp.test(response.data);
    });
}

/**
 * @param {string} title
 * @param {string} url
 * @param {number} interval
 * @returns {*}
 */
function spawn(title, url, interval) {
    console.log('spawn', title, url);

    if (window.Notification && Notification.permission === 'granted') {
        clearInterval(interval);

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

        interval = setInterval(() => {
            grep($http, url, phrase).then(() => {
                spawn(title, url, interval);
            });
        }, delay * MILLISECONDS_IN_SECOND);

        tasks.unshift({ title, url, phrase, delay, interval });
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

    $scope.tasks = tasks;

    $scope.add({
        title: 'Is recent item exist?',
        url: 'https://www.google.com/search?q=test',
        phrase: 'test',
        delay: 2
    });
});
