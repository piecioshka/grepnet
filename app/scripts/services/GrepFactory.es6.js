export default $http => {

    /**
     * @param {string} url Task URL.
     * @param {string} phrase Phrase to grepping.
     * @returns {Promise}
     */
    let grep = (url, phrase) => {
        console.log('grep:', url, phrase);

        let options = { url, phrase };

        return $http.post('http://localhost:3000', options).then(response => {
            return {
                status: Boolean(response.data.status)
            };
        });
    };

    return grep;
};
