(function(angular) {
    var dashboard = angular.module('dashboard', ['ui.bootstrap', 'ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
            this.group = {
                title: 'First Group',
                data: [{
                    sport: 'running',
                    day: 1,
                    minutes: 20
                }, {
                    sport: 'running',
                    day: 2,
                    minutes: 10
                }, {
                    sport: 'sit-ups',
                    day: 2,
                    minutes: 10
                }, {
                    sport: 'running',
                    day: 3,
                    minutes: 30
                }],
                charts: [{
                    title: 'Line Chart',
                    type: 'line',
                    width: 300,
                    height: 100
                }, {
                    title: 'Bar Chart',
                    type: 'bar',
                    width: 200,
                    height: 200
                }]
            };

        }
    ]);
})(angular);