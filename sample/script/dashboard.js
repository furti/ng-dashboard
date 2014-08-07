(function(angular) {
    var dashboard = angular.module('dashboard', ['ui.bootstrap', 'ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
            this.group = {
                title: 'First Group',
                charts: [{
                    title: 'Line Chart',
                    width: 300,
                    height: 100
                }, {
                    title: 'Bar Chart',
                    width: 200,
                    height: 200
                }]
            };

        }
    ]);
})(angular);