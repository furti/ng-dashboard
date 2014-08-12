(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('line', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['scaleParser',
        function(scaleParser) {
            this.scaleParser = scaleParser;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0])
            .width(widgetData.rawData.width)
            .height(widgetData.rawData.height)
            .dimension(widgetData.dimension)
            .group(widgetData.group)
            .x(this.scaleParser.parse(widgetData.rawData.x));

        if (widgetData.rawData.yAxisPadding) {
            lineChart.yAxisPadding(widgetData.rawData.yAxisPadding);
        }

        lineChart.render();

        return lineChart;
    };
})(angular);