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

            this.example = {
                title: 'Sample Data',
                dataUrl: './sample/data/data.json',
                widgets: [{
                    title: 'Line Chart',
                    type: 'linechart',
                    width: 350,
                    height: 200,
                    dimension: 'd.Run',
                    group: {
                        functionName: 'sum',
                        parameters: {
                            value: 'v.Speed * v.Run / 1000'
                        }
                    },
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
                    group: {
                        functionName: 'sum',
                        parameters: {
                            value: 'v.Speed * v.Run / 1000'
                        }
                    },
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
                    group: {
                        functionName: 'sum',
                        parameters: {
                            value: 'v.Speed * v.Run'
                        }
                    },
                    slicesCap: 5,
                    innerRadius: 40,
                    legend: true
                }, {
                    title: 'Box Plot',
                    type: 'boxPlot',
                    width: 350,
                    height: 200,
                    dimension: '"exp-" + d.Expt',
                    group: {
                        functionName: 'array',
                        parameters: {
                            value: 'v.Speed'
                        }
                    },
                    margins: margins,
                    elasticX: true,
                    elasticY: true
                }, {
                    title: 'Heat Map',
                    type: 'heatmap',
                    width: 350,
                    height: 200,
                    dimension: '[d.Run, d.Expt]',
                    group: {
                        functionName: 'sum',
                        parameters: {
                            value: 'v.Speed'
                        }
                    },
                    keyAccessor: 'd.key[0]',
                    valueAccessor: 'd.key[1]',
                    titleAccessor: '"Run: " + d.key[0] + "\n" + "Expt: " + d.key[1] + "\n" + "Speed: " + d.value + " km/s"',
                    colorAccessor: 'd.value'
                }]
            };

            //            this.crime = {
            //                name: 'crime',
            //                title: 'Major Canadian City Crime Stats 1998-2011',
            //                dataUrl: './data/crime.json',
            //                widgets: [{
            //                    name: 'homicide',
            //                    title: 'Homicide Incidents by Year',
            //                    type: 'line',
            //                    width: 360,
            //                    height: 150,
            //                    margins: {
            //                        top: 10,
            //                        right: 50,
            //                        bottom: 30,
            //                        left: 60
            //                    },
            //                    dimension: 'd.year',
            //                    group: '',
            //                    valueAccessor: 'd.value.homicide'
            //
            //                }]
            //            };

        }
    ]);
})(angular);