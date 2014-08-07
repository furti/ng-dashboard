(function(angular) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.directive('chartGroup', [

        function() {

            return {
                restrict: 'E',
                scope: {
                    groupData: '=groupData'
                },
                controller: ['$scope',
                    function($scope) {}
                ],
                link: function(scope, element, attrs) {
                    element.addClass('chart-group');
                },
                templateUrl: './template/chartGroup.html'
            };
        }
    ]);
})(angular);