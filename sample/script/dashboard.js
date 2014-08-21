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
                    dimension: 'd.Run',
                    group: 'sum({"value": d.Speed * d.Run / 1000})',
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
                    dimension: 'd.Run',
                    group: 'sum({"value": d.Speed * d.Run / 1000})',
                    x: 'linear({"domain": [6, 20]})',
                    brushOn: true,
                    yAxisLabel: 'This is the Y Axis!',
                    margins: margins
                }, {
                    title: 'Pie Chart',
                    type: 'piechart',
                    width: 350,
                    height: 200,
                    dimension: '"run-" + d.Run',
                    group: 'sum({"value": d.Speed * d.Run})',
                    slicesCap: 5,
                    innerRadius: 40,
                    legend: true
                }, {
                    title: 'Box Plot',
                    type: 'boxPlot',
                    width: 350,
                    height: 200,
                    dimension: '"exp-" + d.Expt',
                    group: 'array({"value": d.Speed})',
                    margins: margins,
                    elasticX: true,
                    elasticY: true
                }, {
                    title: 'Heat Map',
                    type: 'heatmap',
                    width: 350,
                    height: 200,
                    dimension: '[d.Run, d.Expt]',
                    group: 'sum({"value": d.Speed})',
                    keyAccessor: 'd.key[0]',
                    valueAccessor: 'd.key[1]',
                    titleAccessor: '"Run: " + d.key[0] + "\n" + "Expt: " + d.key[1] + "\n" + "Speed: " + d.value + " km/s"',
                    colorAccessor: 'd.value'
                }]
            };

        }
    ]);
})(angular);