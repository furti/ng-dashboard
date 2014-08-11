(function(angular) {
    var dashboard = angular.module('dashboard', ['ui.bootstrap', 'ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
            this.group = {
                title: 'Sports',
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
                widgets: [{
                        title: 'Duration per Day',
                        type: 'line',
                        width: 300,
                        height: 150,
                        dimension: 'd.day',
                        group: 'sum({"value": "d.minutes"})',
                        x: 'linear({"domain": [0, 20]})' //TODO: implement scale parser
                    }
                    /*, {
                    title: 'Bar Chart',
                    type: 'bar',
                    width: 200,
                    height: 200
                }*/
                ]
            };

        }
    ]);
})(angular);