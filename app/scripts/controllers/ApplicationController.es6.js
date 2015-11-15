class ApplicationController {
    $scope = null;
    $state = null;
    tasks = null;

    /* @ngInject */
    constructor($scope, $rootScope, $state, $stateParams, tasks) {
        this.$scope = $scope;
        this.$state = $state;
        this.tasks = tasks;

        $scope.tasks = tasks.getAll();

        this._resetState();

        $scope.add = (task) => {
            this.tasks.add(task);
            this.$state.go('list-of-tasks');
        };

        $scope.edit = (task) => {
            this.tasks.edit($stateParams.index, task);
            this.$state.go('list-of-tasks');
        };

        $scope.submit = (task) => {
            switch ($rootScope.mode) {
                case 'add':
                    $scope.add(task);
                    break;

                case 'edit':
                    $scope.edit(task);
                    break;

                // no default
            }
        };
    }

    _resetState() {
        this.$scope.tasks.forEach((task) => {
            if (task.state === 'started') {
                task.state = 'new';
            }
        });
    }
}

export default ApplicationController;
