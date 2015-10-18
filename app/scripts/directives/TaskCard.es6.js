const MILLISECONDS_IN_SECOND = 1000;

class Controller {
    $http = null;
    $scope = null;
    $interval = null;

    spawn = null;
    storage = null;
    tasks = null;

    countdownInterval = null;
    grepInterval = null;

    constructor($http, $scope, $state, $interval, spawn, storage, tasks) {
        this.$http = $http;
        this.$scope = $scope;
        this.$interval = $interval;

        this.spawn = spawn;
        this.storage = storage;
        this.tasks = tasks;

        $scope.pause = () => {
            this.stopGrepping();
            $scope.task.state = 'paused';
            this._save();
        };

        $scope.start = () => {
            this.startGrepping();
            $scope.task.state = 'started';
            this._save();
        };

        $scope.edit = () => {
            this.stopGrepping();
            $state.go('edit-task', {
                index: $scope.$index
            });
        };

        $scope.remove = () => {
            this.stopGrepping();
            tasks.remove($scope.$index);
        };

        $scope.is = (state) => {
            return $scope.task.state === state;
        };

        if ($scope.is('new')) {
            this.startGrepping();
            $scope.task.state = 'started';
            this._save();
        }
    }

    _save() {
        this.storage.save('grepnet-tasks', this.tasks.getAll());
    }

    stopGrepping() {
        this.$interval.cancel(this.countdownInterval);
        this.countdownInterval = null;

        this.$interval.cancel(this.grepInterval);
        this.grepInterval = null;
    }

    resetCountdown() {
        this.$scope.task.countdown = this.$scope.task.delay;
    }

    /**
     * @param {string} url Task URL.
     * @param {string} phrase Phrase to grepping.
     * @returns {Promise}
     */
    grep(url, phrase) {
        let options = { url, phrase };

        return this.$http.post('http://localhost:3000', options).then((response) => {
            return {
                status: Boolean(response.data.status)
            };
        });
    }

    startGrepping() {
        this.resetCountdown();

        this.countdownInterval = this.$interval(() => {
            this.$scope.task.countdown--;
        }, MILLISECONDS_IN_SECOND);

        this.grepInterval = this.$interval(() => {
            this.$scope.task.state = 'grepping';

            this.grep(this.$scope.task.url, this.$scope.task.phrase).then((response) => {
                this.resetCountdown();

                if (response.status) {
                    this.stopGrepping();
                    this.$scope.task.state = 'completed';
                    this.spawn(this.$scope.task.title, this.$scope.task.url);
                } else {
                    this.$scope.task.state = 'started';
                }

                this._save();
            });
        }, this.$scope.task.delay * MILLISECONDS_IN_SECOND);
    }
}

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/TaskCard.html',
        controller: Controller
    };
};
