(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('line', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['scaleParser', 'baseChartMixin',
        function(scaleParser, baseChartMixin) {
            this.scaleParser = scaleParser;
            this.baseChartMixin = baseChartMixin;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0]);

        this.baseChartMixin.configureChart(lineChart, widgetData);

        lineChart.x(this.scaleParser.parse(widgetData.rawData.x));

        if (widgetData.rawData.yAxisPadding) {
            lineChart.yAxisPadding(widgetData.rawData.yAxisPadding);
        }

        lineChart.render();

        return lineChart;
    };
})(angular);