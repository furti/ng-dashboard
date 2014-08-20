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
                    type: 'linechart',
                    width: 350,
                    height: 200,
                    dimension: 'Run',
                    group: 'sum({"value": Speed * Run / 1000})',
                    x: 'linear({"domain": [6, 20]})',
                    renderArea: true,
                    brushOn: false,
                    renderDataPoints: true,
                    yAxisLabel: 'This is the Y Axis!',
                    interpolate: 'step-before',
                    margins: margins
                }, {
                    title: 'Bar Chart',
                    type: 'barchart',
                    width: 350,
                    height: 200,
                    dimension: 'Run',
                    group: 'sum({"value": Speed * Run / 1000})',
                    x: 'linear({"domain": [6, 20]})',
                    brushOn: true,
                    yAxisLabel: 'This is the Y Axis!',
                    margins: margins
                }, {
                    title: 'Pie Chart',
                    type: 'piechart',
                    width: 350,
                    height: 200,
                    dimension: '"run-" + Run',
                    group: 'sum({"value": Speed * Run})',
                    slicesCap: 5,
                    innerRadius: 40,
                    legend: true
                }, {
                    title: 'Box Plot',
                    type: 'boxPlot',
                    width: 350,
                    height: 200,
                    dimension: '"exp-" + Expt',
                    group: 'array({"value": Speed})',
                    margins: margins,
                    elasticX: true,
                    elasticY: true
                }, {
                    title: 'Heat Map',
                    type: 'heatmap',
                    width: 350,
                    height: 200,
                    dimension: '[Run, Expt]',
                    group: 'sum({"value": Speed})',
                    keyAccessor: 'key[0]',
                    valueAccessor: 'key[1]',
                    titleAccessor: '"Run: " + key[0] + "\n" + "Expt: " + key[1] + "\n" + "Speed: " + value + " km/s"',
                    colorAccessor: 'd.value'
                }]
            };

        }
    ]);
})(angular);