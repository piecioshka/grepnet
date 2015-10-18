class ApplicationController {
    $scope = null;
    $state = null;
    tasks = null;

    constructor($scope, $state, tasks) {
        this.$scope = $scope;
        this.$state = $state;
        this.tasks = tasks;

        $scope.tasks = tasks.getAll();

        $scope.add = ({ title, url, phrase, delay }) => {
            this.tasks.add({ title, url, phrase, delay });
            this.$state.go('list-of-tasks');
        };

        // TODO(piecioshka): Below is for development. Remove before publish.

        $scope.add({
            title: 'Is recent item exist?',
            url: 'https://www.google.com/search?q=test',
            phrase: 'test',
            delay: 2
        });
    }
}

export default ApplicationController;
