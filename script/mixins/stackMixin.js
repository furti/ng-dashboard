(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('stackMixin', new StackMixin());
        }
    ]);

    function StackMixin() {}

    StackMixin.prototype.initialize = ['invokeIfDefined', '$parse', 'crossfilterUtils', 'widgetExpressionParser',
        function(invokeIfDefined, $parse, crossfilterUtils, widgetExpressionParser) {
            this.invokeIfDefined = invokeIfDefined;
            this.$parse = $parse;
            this.crossfilterUtils = crossfilterUtils;
            this.widgetExpressionParser = widgetExpressionParser;
        }
    ];

    StackMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;

        //Nothing to do here if no stacks are defined
        if (!raw.stacks) {
            return;
        }
        var invoke = this.invokeIfDefined,
            dim = widgetData.dimension,
            mixin = this;

        angular.forEach(raw.stacks, function(stack) {
            var grouping = mixin.crossfilterUtils.groupFunctions(stack);
            var group = dim.group().reduce(grouping.add, grouping.remove, grouping.init);
            var valueAccessor;

            if (stack.valueAccessor) {
                valueAccessor = mixin.widgetExpressionParser.valueFunction(mixin.$parse(stack.valueAccessor));
            }

            if (stack.name && valueAccessor) {
                chart.stack(group, stack.name, valueAccessor);
            } else if (valueAccessor) {
                chart.stack(group, valueAccessor);
            } else if (stack.name) {
                chart.stack(group, stack.name);
            } else {
                chart.stack(group);
            }
        });

        invoke(raw, chart, 'hideableStacks');

    };
})(angular);