angular.module('grep').service('Checker', function ($http) {
    this.check = (url, phrase) => {
        console.log('Checker#check');

        let regexp = new RegExp(phrase);

        return $http.get(url).then(response => {
            return regexp.test(response.data);
        });
    };
});
