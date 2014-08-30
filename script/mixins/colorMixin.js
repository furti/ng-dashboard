(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('colorMixin', new ColorMixin());
        }
    ]);

    function ColorMixin() {}

    ColorMixin.prototype.initialize = ['invokeIfDefined', '$parse', 'scaleParser',
        function(invokeIfDefined, $parse, scaleParser) {
            this.invokeIfDefined = invokeIfDefined;
            this.$parse = $parse;
            this.scaleParser = scaleParser;
        }
    ];

    ColorMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;

        invoke(raw, chart, 'colorDomain');
        invoke(raw, chart, 'linearColors');
        invoke(raw, chart, 'ordinalColors');

        if (raw.colors) {
            chart.colors(this.scaleParser.parse(raw.colors));
        }

        if (raw.colorAccessor) {
            chart.colorAccessor(colorAccessor(this.$parse(raw.colorAccessor)));
        }


        if (raw.calculateColorDomain) {
            chart.calculateColorDomain();
        }
    };

    function colorAccessor(parsedExpression) {
        function cAccessor(d, i) {
            return parsedExpression({
                d: d,
                i: i
            });
        }

        return cAccessor;
    }
})(angular);