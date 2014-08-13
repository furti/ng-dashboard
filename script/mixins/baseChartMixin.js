(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('baseChartMixin', new BaseChartMixin());
        }
    ]);

    function BaseChartMixin() {}

    BaseChartMixin.prototype.configureChart = function(chart, widgetData) {
        chart.width(widgetData.rawData.width)
            .height(widgetData.rawData.height)
            .dimension(widgetData.dimension)
            .group(widgetData.group);
    };
})(angular);