(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('line', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin',
        function(baseChartMixin, coordinateGridMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0]);

        this.baseChartMixin.configureChart(lineChart, widgetData);
        this.coordinateGridMixin.configureChart(lineChart, widgetData);

        setProperty(lineChart, widgetData.rawData, 'renderArea');
        setProperty(lineChart, widgetData.rawData, 'brushOn');
        setProperty(lineChart, widgetData.rawData, 'renderDataPoints');
        setProperty(lineChart, widgetData.rawData, 'interpolate');

        lineChart.render();

        return lineChart;
    };

    function setProperty(chart, data, property) {
        if (angular.isDefined(data[property])) {
            chart[property](data[property]);
        }
    }
})(angular);