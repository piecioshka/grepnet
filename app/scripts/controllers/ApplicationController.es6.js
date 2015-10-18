class ApplicationController {
    $scope = null;
    $state = null;
    tasks = null;

    constructor($scope, $state, $stateParams, tasks) {
        this.$scope = $scope;
        this.$state = $state;
        this.tasks = tasks;

        $scope.tasks = tasks.getAll();

        $scope.add = (task) => {
            this.tasks.add(task);
            this.$state.go('list-of-tasks');
        };

        $scope.edit = (task) => {
            this.tasks.edit($stateParams.index, task);
            this.$state.go('list-of-tasks');
        };

        // TODO(piecioshka): Below is for development. Remove before publish.

        let google = {
            title: 'Is recent item exist?',
            url: 'https://www.google.com/search?q=test',
            phrase: 'test',
            delay: 10
        };

        let piecioshka = {
            title: 'Is HbbTV post is published?',
            url: 'http://piecioshka.pl/',
            phrase: 'HbbTV',
            delay: 10
        };

        // $scope.add(google);
        $scope.add(piecioshka);
    }
}

export default ApplicationController;
