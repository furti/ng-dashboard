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

        setProperty(lineChart, widgetData.rawData, 'renderArea');
        setProperty(lineChart, widgetData.rawData, 'brushOn');
        setProperty(lineChart, widgetData.rawData, 'renderDataPoints');
        setProperty(lineChart, widgetData.rawData, 'yAxisPadding');
        setProperty(lineChart, widgetData.rawData, 'yAxisLabel');
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