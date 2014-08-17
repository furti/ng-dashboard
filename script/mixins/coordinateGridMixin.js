(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('coordinateGridMixin', new CoordinateGridMixin());
        }
    ]);

    function CoordinateGridMixin() {}

    CoordinateGridMixin.prototype.initialize = ['scaleParser', 'invokeIfDefined',
        function(scaleParser, invokeIfDefined) {
            this.scaleParser = scaleParser;
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    CoordinateGridMixin.prototype.configureChart = function(chart, widgetData) {
        chart.x(this.scaleParser.parse(widgetData.rawData.x));

        this.invokeIfDefined(widgetData.rawData, chart, 'yAxisPadding');
        this.invokeIfDefined(widgetData.rawData, chart, 'yAxisLabel');
        this.invokeIfDefined(widgetData.rawData, chart, 'brushOn');
    };
})(angular);