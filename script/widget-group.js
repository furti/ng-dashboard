(function(angular, crossfilter) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.directive('widgetGroup', [

        function() {

            return {
                restrict: 'E',
                scope: {
                    groupData: '=groupData'
                },
                controller: ['$scope', '$http',
                    function($scope, $http) {
                        if (angular.isArray($scope.groupData.data)) {
                            $scope.crossFilter = crossfilter($scope.groupData.data);
                        } else if (angular.isString($scope.groupData.dataUrl)) {
                            $http({
                                method: 'GET',
                                url: $scope.groupData.dataUrl
                            })
                                .success(function(data) {
                                    $scope.crossFilter = crossfilter(data);
                                })
                                .error(function(error) {
                                    throw error;
                                });
                        } else {
                            throw 'No data array or data url specified for group ' + $scope.groupData.name;
                        }
                    }
                ],
                link: function(scope, element) {
                    element.addClass('widget-group');
                },
                templateUrl: './template/widgetGroup.html'
            };
        }
    ]);
})(angular, crossfilter);