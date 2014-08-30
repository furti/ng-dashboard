(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('baseChartMixin', new BaseChartMixin());
        }
    ]);

    function BaseChartMixin() {}

    BaseChartMixin.prototype.initialize = ['invokeIfDefined', 'widgetExpressionParser', 'crossfilterUtils',
        function(invokeIfDefined, widgetExpressionParser, crossfilterUtils) {
            this.invokeIfDefined = invokeIfDefined;
            this.widgetExpressionParser = widgetExpressionParser;
            this.crossfilterUtils = crossfilterUtils;
        }
    ];

    BaseChartMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;
        var dimension = this.buildDimension(widgetData);
        var group = this.buildGroup(dimension, widgetData);


        chart.dimension(dimension);

        if (raw.group.name) {
            chart.group(group, raw.group.name);
        } else {
            chart.group(group);
        }

        invoke(raw, chart, 'width');
        invoke(raw, chart, 'minWidth');
        invoke(raw, chart, 'height');
        invoke(raw, chart, 'minHeight');
        invoke(raw, chart, 'transitionDuration');

        if (raw.keyAccessor) {
            chart.keyAccessor(this.widgetExpressionParser.valueFunction(raw.keyAccessor));
        }

        if (raw.valueAccessor) {
            chart.valueAccessor(this.widgetExpressionParser.valueFunction(raw.valueAccessor));
        }

        if (raw.titleAccessor) {
            chart.title(this.widgetExpressionParser.valueFunction(raw.titleAccessor));
        }


        this.setupLegend(chart, raw.legend);
    };

    BaseChartMixin.prototype.setupLegend = function(chart, legendData) {
        if (!legendData) {
            return;
        }

        var invoke = this.invokeIfDefined;
        var legend = dc.legend();

        invoke(legendData, legend, 'x');
        invoke(legendData, legend, 'y');
        invoke(legendData, legend, 'gap');
        invoke(legendData, legend, 'itemHeight');
        invoke(legendData, legend, 'horizontal');
        invoke(legendData, legend, 'legendWidth');
        invoke(legendData, legend, 'itemWidth');

        chart.legend(legend);
    };

    BaseChartMixin.prototype.buildDimension = function(widgetData) {
        var crossfilter = widgetData.crossfilter;
        var dimensionFunction = this.crossfilterUtils.dimensionFunction(widgetData.rawData.dimension);

        return crossfilter.dimension(dimensionFunction);
    };

    BaseChartMixin.prototype.buildGroup = function(dimension, widgetData) {
        var grouping = this.crossfilterUtils.groupFunctions(widgetData.rawData.group);
        return dimension.group().reduce(grouping.add, grouping.remove, grouping.init);
    };
})(angular);