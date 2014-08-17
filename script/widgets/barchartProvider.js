(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('bar', new BarChartProvider());
        }
    ]);

    function BarChartProvider() {}

    BarChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'invokeIfDefined',
        function(baseChartMixin, coordinateGridMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    BarChartProvider.prototype.createWidget = function(element, widgetData) {
        var barChart = dc.barChart(element[0]);

        this.baseChartMixin.configureChart(barChart, widgetData);
        this.coordinateGridMixin.configureChart(barChart, widgetData);

        barChart.render();

        return barChart;
    };
})(angular);