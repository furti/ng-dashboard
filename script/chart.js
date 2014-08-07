(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.directive('chart', [

        function() {

            return {
                restrict: 'E',
                scope: {
                    chartData: '=chartData'
                },
                controller: ['$scope',
                    function($scope) {}
                ],
                link: function(scope, element, attrs) {
                    element.addClass('chart');
                },
                templateUrl: './template/chart.html'
            };
        }
    ]);
})(angular);