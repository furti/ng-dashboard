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
        var invoke = this.invokeIfDefined
        var raw = widgetData.rawData;

        if (raw.x) {
            chart.x(this.scaleParser.parse(raw.x));
        }

        invoke(raw, chart, 'yAxisPadding');
        invoke(raw, chart, 'yAxisLabel');
        invoke(raw, chart, 'brushOn');
        invoke(raw, chart, 'elasticX');
        invoke(raw, chart, 'elasticY');
    };
})(angular);