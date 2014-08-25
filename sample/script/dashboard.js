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

            var crimeIncidentByYearGroup = {
                functionName: 'conditional',
                parameters: {
                    init: {
                        totalCrimeRecords: 0,
                        totalCrime: 0,
                        totalCrimeAvg: 0,
                        violentCrimeRecords: 0,
                        violentCrime: 0,
                        violentCrimeAvg: 0,
                        homicide: 0,
                        nonViolentCrimeAvg: 0
                    },
                    conditions: {
                        isTotalCrimeRateRecord: 'v.type == "Total, all violations" && v.sub_type == "Rate per 100,000 population"',
                        isViolentCrimeRateRecord: 'v.type == "Total violent Criminal Code violations" && v.sub_type == "Rate per 100,000 population"',
                        isHomicideIncidentRecord: 'v.type == "Homicide" && v.sub_type == "Actual incidents"'
                    },
                    handlers: {
                        add: {
                            isTotalCrimeRateRecord: {
                                'p.totalCrimeRecords': 'p.totalCrimeRecords + 1',
                                'p.totalCrime': 'p.totalCrime + v.number',
                                'p.totalCrimeAvg': 'p.totalCrime / p.totalCrimeRecords'
                            },
                            isViolentCrimeRateRecord: {
                                'p.violentCrimeRecords': 'p.violentCrimeRecords + 1',
                                'p.violentCrime': 'p.violentCrime + v.number',
                                'p.violentCrimeAvg': 'p.violentCrime / p.violentCrimeRecords'
                            },
                            isHomicideIncidentRecord: {
                                'p.homicide': 'p.homicide + v.number'
                            },
                            post: {
                                'p.nonViolentCrimeAvg': 'p.totalCrimeAvg - p.violentCrimeAvg'
                            }
                        },
                        remove: {
                            isTotalCrimeRateRecord: {
                                'p.totalCrimeRecords': 'p.totalCrimeRecords - 1',
                                'p.totalCrime': 'p.totalCrime - v.number',
                                'p.totalCrimeAvg': 'p.totalCrime / p.totalCrimeRecords'
                            },
                            isViolentCrimeRateRecord: {
                                'p.violentCrimeRecords': 'p.violentCrimeRecords - 1',
                                'p.violentCrime': 'p.violentCrime - v.number',
                                'p.violentCrimeAvg': 'p.violentCrime / p.violentCrimeRecords'
                            },
                            isHomicideIncidentRecord: {
                                'p.homicide': 'p.homicide - v.number'
                            },
                            post: {
                                'p.nonViolentCrimeAvg': 'p.totalCrimeAvg - p.violentCrimeAvg'
                            }
                        }
                    }
                }
            };

            this.crime = {
                name: 'crime',
                title: 'Major Canadian City Crime Stats 1998-2011',
                dataUrl: './sample/data/crime.json',
                widgets: [{
                    name: 'homicide',
                    title: 'Homicide Incidents by Year',
                    type: 'linechart',
                    width: 360,
                    height: 150,
                    margins: {
                        top: 10,
                        right: 50,
                        bottom: 30,
                        left: 60
                    },
                    dimension: 'd.year',
                    group: crimeIncidentByYearGroup,
                    valueAccessor: 'd.value.homicide',
                    x: 'linear({"domain": [1997, 2012]})',
                    renderHorizontalGridLines: true,
                    elasticY: true,
                    brushOn: true,
                    titleAccessor: 'd.key + "\nHomicide incidents: " + Math.round(d.value.homicide)',
                    xAxis: {
                        ticks: 5,
                        tickFormat: 'd'
                    }
                }]
            };

        }
    ]);
})(angular);