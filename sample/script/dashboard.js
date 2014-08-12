(function(angular) {
    var dashboard = angular.module('dashboard', ['ui.bootstrap', 'ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
            this.group = {
                title: 'Sports',
                dataUrl: './sample/data/sports.json',
                widgets: [{
                        title: 'Duration per Day',
                        type: 'line',
                        width: 350,
                        height: 200,
                        dimension: 'd.day',
                        group: 'sum({"value": "d.minutes"})',
                        x: 'linear({"domain": [1, 31]})',
                        yAxisPadding: 5,
                        axis: {
                            ticks: 31
                        } //TODO: implement axis
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