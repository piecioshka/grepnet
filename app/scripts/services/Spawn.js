angular.module('grepnet').factory('spawn', () => {

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

    return spawn;
});
