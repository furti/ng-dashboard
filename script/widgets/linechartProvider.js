(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('line', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0])
            .width(widgetData.rawData.width)
            .height(widgetData.rawData.height)
            .dimension(widgetData.dimension)
            .group(widgetData.group)
            .x(d3.scale.linear().domain([0, 10]));

        lineChart.render();

        return lineChart;
    };
})(angular);