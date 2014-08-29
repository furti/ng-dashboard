(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('bubbleMixin', new BubbleMixin());
        }
    ]);

    function BubbleMixin() {}

    BubbleMixin.prototype.initialize = ['scaleParser', '$parse', 'widgetExpressionParser',
        function(scaleParser, $parse, widgetExpressionParser) {
            this.scaleParser = scaleParser;
            this.$parse = $parse;
            this.widgetExpressionParser = widgetExpressionParser;
        }
    ];

    BubbleMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        //        var invoke = this.invokeIfDefined;

        if (raw.r) {
            chart.r(this.scaleParser.parse(raw.r));
        }

        if (raw.radiusValueAccessor) {
            chart.radiusValueAccessor(this.widgetExpressionParser.valueFunction(this.$parse(raw.radiusValueAccessor)));
        }
    };
})(angular);