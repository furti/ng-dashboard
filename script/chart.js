(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    function ChartFactory(chartProviders) {
        this.chartProviders = chartProviders;
    }

    ChartFactory.prototype.createChart = function(element, chartData) {
        if (!this.chartProviders[chartData.type]) {
            throw 'No chart with ' + chartData.type + ' registered';
        }

        return this.chartProviders[chartData.type].createChart(element, chartData);
    };

    ngDashboard.provider('chartFactory', [

        function() {
            var chartProviders = {};

            this.registerChartProvider = function(name, provider) {
                chartProviders[name] = provider;
            };

            this.$get = [

                function() {
                    return new ChartFactory(chartProviders);
                }
            ];
        }
    ]);


    ngDashboard.directive('chart', ['chartFactory',

        function(chartFactory) {

            return {
                restrict: 'E',
                scope: {
                    chartData: '=chartData',
                    crossFilter: '=crossFilter'
                },
                link: function(scope, element, attrs) {
                    var chart;
                    element.addClass('chart');

                    //                            chart = chartFactory.createChart(element, newValue);
                },
                templateUrl: './template/chart.html'
            };
        }
    ]);
})(angular);