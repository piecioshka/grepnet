const MILLISECONDS_IN_SECOND = 1000;

class Controller {
    interval = null;

    constructor($scope, $interval, grep, spawn, tasks) {
        console.log($scope);

        let stopGrepping = () => {
            $interval.cancel(this.interval);
            this.interval = null;
        };

        let tick = () => {
            grep($scope.task.url, $scope.task.phrase).then(response => {
                if (response.status) {
                    stopGrepping();
                    $scope.task.status = 'completed';
                    spawn($scope.task.title, $scope.task.url);
                }
            });
        };

        let startGrepping = () => {
            this.interval = $interval(tick, $scope.task.delay * MILLISECONDS_IN_SECOND);
        };

        $scope.pause = () => {
            console.info('Task "%s" paused!', $scope.task.title);
            stopGrepping();
            $scope.task.status = 'paused';
        };

        $scope.start = () => {
            console.info('Task "%s" started!', $scope.task.title);
            startGrepping();
            $scope.task.status = 'started';
        };

        $scope.remove = () => {
            console.warn('Task "%s" removed!', $scope.task.title);
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
