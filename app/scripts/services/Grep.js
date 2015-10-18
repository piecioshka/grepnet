angular.module('grepnet').factory('grep', () => {

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

    return grep;
});
