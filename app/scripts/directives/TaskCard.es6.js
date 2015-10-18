const MILLISECONDS_IN_SECOND = 1000;

class Controller {
    $scope = null;
    $interval = null;

    grep = null;
    spawn = null;

    countdownInterval = null;
    grepInterval = null;

    constructor($scope, $state, $interval, grep, spawn, tasks) {
        this.$scope = $scope;
        this.$interval = $interval;

        this.grep = grep;
        this.spawn = spawn;

        $scope.pause = () => {
            this.stopGrepping();
            $scope.task.status = 'paused';
        };

        $scope.start = () => {
            this.startGrepping();
            $scope.task.status = 'started';
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

        $scope.is = (status) => {
            return $scope.task.status === status;
        };

        if ($scope.is('new')) {
            this.startGrepping();
            $scope.task.status = 'started';
        }
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

    startGrepping() {
        this.resetCountdown();

        this.countdownInterval = this.$interval(() => {
            this.$scope.task.countdown--;
        }, MILLISECONDS_IN_SECOND);

        this.grepInterval = this.$interval(() => {
            this.grep(this.$scope.task.url, this.$scope.task.phrase).then((response) => {
                this.resetCountdown();

                if (response.status) {
                    this.stopGrepping();
                    this.$scope.task.status = 'completed';
                    this.spawn(this.$scope.task.title, this.$scope.task.url);
                }
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
