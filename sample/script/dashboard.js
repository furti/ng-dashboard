(function(angular) {
    var dashboard = angular.module('dashboard', ['ngDashboard']);

    dashboard.controller('ChartController', ['$parse',

        function($parse) {
            var margins = {
                top: 10,
                left: 50,
                right: 10,
                bottom: 20
            };

            this.group = {
                title: 'Sample Data',
                dataUrl: './sample/data/data.json',
                widgets: [{
                    title: 'Line Chart',
                    type: 'line',
                    width: 350,
                    height: 200,
                    dimension: 'd.Run',
                    group: 'sum({"value": d.Speed * d.Run / 1000})',
                    x: 'linear({"domain": [0, 20]})',
                    renderArea: true,
                    brushOn: false,
                    renderDataPoints: true,
                    yAxisLabel: 'This is the Y Axis!',
                    interpolate: 'step-before',
                    margins: margins
                }, {
                    title: 'Bar Chart',
                    type: 'bar',
                    width: 350,
                    height: 200,
                    dimension: 'd.Run',
                    group: 'sum({"value": d.Speed * d.Run / 1000})',
                    x: 'linear({"domain": [6, 20]})',
                    brushOn: true,
                    yAxisLabel: 'This is the Y Axis!',
                    margins: margins
                }, {
                    title: 'Pie Chart',
                    type: 'pie',
                    width: 350,
                    height: 200,
                    dimension: '"run-" + d.Run',
                    group: 'sum({"value": d.Speed * d.Run})',
                    slicesCap: 5,
                    innerRadius: 40,
                    legend: true
                }]
            };

        }
    ]);
})(angular);