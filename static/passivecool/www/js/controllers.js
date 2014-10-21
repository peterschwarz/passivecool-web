angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $interval, $http, Status) {
    $scope.manualOverride = {};
    $scope.manualOverride.isEnabled = false;
    $scope.manualOverride.position = 0;

    var interval_func = function() {
        $http({method: 'GET', url: '/api/status'})
            .success(function(data, status, headers, config){
                $scope.status = data;
                if (!$scope.manualOverride.isEnabled) {
                    $scope.manualOverride.position = $scope.status.position;
                }
            });
         };

    $scope.positionChanged = function() {
        if ($scope.manualOverride.isEnabled) {
            console.log("changing position to " + $scope.manualOverride.position)
            $http({method: 'PUT', url: '/api/status', data:  {position: $scope.manualOverride.position}});
        }
    };


    $interval(interval_func, 1000 * 10);
    $scope.status = Status.get();

})

.controller('AccountCtrl', function($scope) {
});
