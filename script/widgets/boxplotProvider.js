(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('boxPlot', new BoxPlotProvider());
        }
    ]);

    function BoxPlotProvider() {}

    BoxPlotProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin',
        function(baseChartMixin, coordinateGridMixin, marginMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.marginMixin = marginMixin;
        }
    ];

    BoxPlotProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.boxPlot(element[0]);

        this.baseChartMixin.configureChart(chart, widgetData);
        this.coordinateGridMixin.configureChart(chart, widgetData);
        this.marginMixin.configureChart(chart, widgetData);


        chart.render();

        return chart;
    };
})(angular);