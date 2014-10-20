angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $interval, $http, Status) {
    $scope.manual_override = false;
    $scope.position = 0;
    var interval_func = function() {
        $http({method: 'GET', url: '/api/status'})
            .success(function(data, status, headers, config){
                $scope.status = data;
                if (!$scope.manual_override) {
                    $scope.position = $scope.status.position;
                }
            });
         };

    $scope.$watch('manual_override', function(newValue, oldValue) {
        console.log("manual_override");
        if (newValue) {
            console.log("manual overrride")
//            $http({method: 'PUT', url: '/api/status/' + newValue});
        } else {
            console.log("auto mode")
        }
    });

    $scope.$watch('position', function(newValue, oldValue) {
        console.log("position");
        if ($scope.manual_override) {
            console.log("changing position to")
            $http({method: 'PUT', url: '/api/status/' + newValue});
        }
    });


 $interval(interval_func, 1000 * 10);


 $scope.status = Status.get();

})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
