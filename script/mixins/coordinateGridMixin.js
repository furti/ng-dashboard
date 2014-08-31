(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('coordinateGridMixin', new CoordinateGridMixin());
        }
    ]);

    function CoordinateGridMixin() {}

    CoordinateGridMixin.prototype.initialize = ['scaleParser', 'invokeIfDefined', 'unitsParser',
        function(scaleParser, invokeIfDefined, unitsParser) {
            this.scaleParser = scaleParser;
            this.invokeIfDefined = invokeIfDefined;
            this.unitsParser = unitsParser;
        }
    ];

    CoordinateGridMixin.prototype.configureChart = function(chart, widgetData) {
        var invoke = this.invokeIfDefined;
        var raw = widgetData.rawData;

        if (raw.x) {
            chart.x(this.scaleParser.parse(raw.x));
        }

        invoke(raw, chart, 'yAxisPadding');
        invoke(raw, chart, 'yAxisLabel');
        invoke(raw, chart, 'brushOn');
        invoke(raw, chart, 'elasticX');
        invoke(raw, chart, 'elasticY');
        invoke(raw, chart, 'mouseZoomable');
        invoke(raw, chart, 'renderHorizontalGridLines');
        invoke(raw, chart, 'renderVerticalGridLines');

        if (raw.xUnits) {
            chart.xUnits(this.unitsParser.parse(raw.xUnits));
        }

        if (raw.xAxis) {
            this.configureAxis(chart.xAxis(), raw.xAxis);
        }

        if (raw.yAxis) {
            this.configureAxis(chart.yAxis(), raw.yAxis);
        }
    };

    CoordinateGridMixin.prototype.configureAxis = function(axis, axisData) {
        var invoke = this.invokeIfDefined;

        invoke(axisData, axis, 'orient');
        invoke(axisData, axis, 'ticks');
        invoke(axisData, axis, 'tickValues');
        invoke(axisData, axis, 'tickSize');
        invoke(axisData, axis, 'innerTickSize');
        invoke(axisData, axis, 'outerTickSize');
        invoke(axisData, axis, 'tickPadding');

        if (axisData.tickFormat) {
            axis.tickFormat(d3.format(axisData.tickFormat));
        }
    };
})(angular);