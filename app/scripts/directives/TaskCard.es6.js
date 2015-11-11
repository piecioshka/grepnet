const MILLISECONDS_IN_SECOND = 1000;

class Controller {
    $http = null;
    $scope = null;
    $interval = null;

    notification = null;
    storage = null;
    tasks = null;

    countdownInterval = null;
    grepInterval = null;

    constructor($http, $scope, $state, $interval, notification, storage, tasks) {
        this.$http = $http;
        this.$scope = $scope;
        this.$interval = $interval;

        this.notification = notification;
        this.storage = storage;
        this.tasks = tasks;

        $scope.pause = () => {
            this.stopCountdown();
            $scope.task.state = 'paused';
            this._save();
        };

        $scope.start = () => {
            this.startCountdown();
            $scope.task.state = 'started';
            this._save();
        };

        $scope.edit = () => {
            this.stopCountdown();
            $state.go('edit-task', {
                index: $scope.$index
            });
        };

        $scope.remove = () => {
            this.stopCountdown();
            tasks.remove($scope.$index);
        };

        $scope.check = () => {
            this.startGrepping();
        };

        $scope.is = (state) => {
            return $scope.task.state === state;
        };

        this._tryStartCountdown();
    }

    _tryStartCountdown() {
        if (this.$scope.is('new')) {
            this.startCountdown();
            this.$scope.task.state = 'started';
            this._save();
        }
    }

    _save() {
        this.storage.save('grepnet-tasks', this.tasks.getAll());
    }

    stopCountdown() {
        this.$interval.cancel(this.countdownInterval);
        this.countdownInterval = null;

        this.$interval.cancel(this.grepInterval);
        this.grepInterval = null;
    }

    resetCountdown() {
        this.$scope.task.countdown = this.$scope.task.delay;
    }

    grep(url, phrase) {
        let options = { url, phrase };

        return this.$http.post('http://0.0.0.0:3000', options).then((response) => {
            return {
                status: Boolean(response.data.status)
            };
        });
    }

    startGrepping() {
        this.$scope.task.state = 'grepping';

        this.grep(this.$scope.task.url, this.$scope.task.phrase).then((response) => {
            this.resetCountdown();

            if (response.status) {
                this.stopCountdown();
                this.$scope.task.state = 'completed';
                this.notification.spawn(this.$scope.task.title, this.$scope.task.url);
            } else {
                this.$scope.task.state = 'started';
            }

            this._save();
        });
    }

    startCountdown() {
        this.resetCountdown();

        this.countdownInterval = this.$interval(() => {
            this.$scope.task.countdown--;
        }, MILLISECONDS_IN_SECOND);

        this.grepInterval = this.$interval(() => this.startGrepping(), this.$scope.task.delay * MILLISECONDS_IN_SECOND);
    }
}

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/TaskCard.html',
        controller: Controller
    };
};
