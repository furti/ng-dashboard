(function(angular) {
    var dashboard = angular.module('dashboard', ['ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
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
                    group: 'sum({"value": "d.Speed * d.Run / 1000"})',
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
                    group: 'sum({"value": "d.Speed * d.Run / 1000"})',
                    x: 'linear({"domain": [6, 20]})',
                    brushOn: true,
                    yAxisLabel: 'This is the Y Axis!',
                    margins: margins
                }]
            };

        }
    ]);
})(angular);