(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('boxPlot', new BoxPlotProvider());
        }
    ]);

    function BoxPlotProvider() {}

    BoxPlotProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'colorMixin',
        function(baseChartMixin, coordinateGridMixin, marginMixin, colorMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.marginMixin = marginMixin;
            this.colorMixin = colorMixin;
        }
    ];

    BoxPlotProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.boxPlot(element[0], widgetData.widgetGroupName);

        this.baseChartMixin.configureChart(chart, widgetData);
        this.coordinateGridMixin.configureChart(chart, widgetData);
        this.marginMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

        chart.render();

        return chart;
    };
})(angular);