const MILLISECONDS_IN_SECOND = 1000;

class Controller {
    countdownInterval = null;
    grepInterval = null;

    constructor($scope, $state, $interval, grep, spawn, tasks) {
        let stopGrepping = () => {
            $interval.cancel(this.countdownInterval);
            this.countdownInterval = null;

            $interval.cancel(this.grepInterval);
            this.grepInterval = null;
        };

        let resetCountdown = () => {
            $scope.task.countdown = $scope.task.delay;
        };

        let startGrepping = () => {
            resetCountdown();

            this.countdownInterval = $interval(() => {
                $scope.task.countdown--;
            }, MILLISECONDS_IN_SECOND);

            this.grepInterval = $interval(() => {
                grep($scope.task.url, $scope.task.phrase).then(response => {
                    resetCountdown();

                    if (response.status) {
                        stopGrepping();
                        $scope.task.status = 'completed';
                        spawn($scope.task.title, $scope.task.url);
                    }
                });
            }, $scope.task.delay * MILLISECONDS_IN_SECOND);
        };

        $scope.pause = () => {
            stopGrepping();
            $scope.task.status = 'paused';
        };

        $scope.start = () => {
            startGrepping();
            $scope.task.status = 'started';
        };

        $scope.edit = () => {
            stopGrepping();
            $state.go('edit-task', {
                index: $scope.$index
            });
        };

        $scope.remove = () => {
            stopGrepping();
            tasks.remove($scope.$index);
        };

        $scope.is = status => {
            return $scope.task.status === status;
        };

        if ($scope.is('started')) {
            startGrepping();
        }
    }
}

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/Task.html',
        controller: Controller
    };
};
