(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('line', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'invokeIfDefined',
        function(baseChartMixin, coordinateGridMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0]);

        this.baseChartMixin.configureChart(lineChart, widgetData);
        this.coordinateGridMixin.configureChart(lineChart, widgetData);

        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderArea');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderArea');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'brushOn');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderDataPoints');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'interpolate');

        lineChart.render();

        return lineChart;
    };
})(angular);