(function(angular) {
    var margins = {
        top: 10,
        left: 50,
        right: 10,
        bottom: 20
    };

    var experimentGroup = {
        title: 'Sample Data',
        dataUrl: './sample/data/data.json',
        filters: [{
            title: 'Experiments',
            allTitle: 'All',
            type: 'select',
            dimension: 'd.Expt'
        }],
        widgets: [{
            title: 'Line Chart',
            type: 'linechart',
            width: 350,
            height: 200,
            dimension: 'd.Run',
            group: {
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run / 1000'
                }
            },
            x: {
                type: 'linear',
                parameters: {
                    domain: [6, 20]
                }
            },
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
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run / 1000'
                }
            },
            x: {
                type: 'linear',
                parameters: {
                    domain: [6, 20]
                }
            },
            brushOn: true,
            yAxisLabel: 'This is the Y Axis!',
            margins: margins
        }, {
            title: 'Pie Chart',
            name: 'pie',
            type: 'piechart',
            width: 350,
            height: 200,
            dimension: '"run-" + d.Run',
            group: {
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run'
                }
            },
            slicesCap: 5,
            innerRadius: 40,
            legend: true
        }, {
            title: 'Pie Chart that shows Top 5 groups',
            name: 'pietop5',
            type: 'piechart',
            width: 350,
            height: 200,
            dimension: '"run-" + d.Run',
            group: {
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run'
                }
            },
            data: 'group.top(5)',
            innerRadius: 40
        }, {
            title: 'Pie Chart with no title and no label',
            name: 'pienotitle',
            type: 'piechart',
            width: 350,
            height: 200,
            dimension: '"run-" + d.Run',
            group: {
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run'
                }
            },
            renderTitle: false,
            renderLabel: false,
            innerRadius: 40,
            legend: true,
            data: 'group.top(10)',
        }, {
            title: 'Box Plot',
            type: 'boxPlot',
            width: 350,
            height: 200,
            dimension: '"exp-" + d.Expt',
            group: {
                type: 'array',
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
                type: 'sum',
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

    angular.module('dashboard')
        .constant('experiments', experimentGroup);
})(angular);