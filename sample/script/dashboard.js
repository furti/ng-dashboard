(function(angular) {
    var dashboard = angular.module('dashboard', ['ui.bootstrap', 'ngDashboard']);

    dashboard.controller('ChartController', [

        function() {
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
                        yAxisPadding: 5
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