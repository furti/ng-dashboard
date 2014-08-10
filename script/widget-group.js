(function(angular, crossfilter) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.directive('widgetGroup', [

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
                    element.addClass('widget-group');
                },
                templateUrl: './template/widgetGroup.html'
            };
        }
    ]);
})(angular, crossfilter);