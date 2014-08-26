(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('barchart', new BarChartProvider());
        }
    ]);

    function BarChartProvider() {}

    BarChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'stackMixin', 'invokeIfDefined', 'colorMixin',
        function(baseChartMixin, coordinateGridMixin, marginMixin, stackMixin, invokeIfDefined, colorMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.marginMixin = marginMixin;
            this.stackMixin = stackMixin;
            this.colorMixin = colorMixin;
        }
    ];

    BarChartProvider.prototype.createWidget = function(element, widgetData) {
        var barChart = dc.barChart(element[0]);

        this.baseChartMixin.configureChart(barChart, widgetData);
        this.stackMixin.configureChart(barChart, widgetData);
        this.coordinateGridMixin.configureChart(barChart, widgetData);
        this.marginMixin.configureChart(barChart, widgetData);
        this.colorMixin.configureChart(barChart, widgetData);
        
        barChart.render();

        return barChart;
    };
})(angular);