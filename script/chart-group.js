(function(angular, crossfilter) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.directive('chartGroup', [

        function() {

            return {
                restrict: 'E',
                scope: {
                    groupData: '=groupData'
                },
                controller: ['$scope',
                    function($scope) {
                        if (angular.isArray($scope.groupData.data)) {
                            $scope.crossFilter = crossfilter($scope.groupData.data);
                        } else {

                        }
                    }
                ],
                link: function(scope, element, attrs) {
                    element.addClass('chart-group');
                },
                templateUrl: './template/chartGroup.html'
            };
        }
    ]);
})(angular, crossfilter);