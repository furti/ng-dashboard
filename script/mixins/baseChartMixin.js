(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('baseChartMixin', new BaseChartMixin());
        }
    ]);

    function BaseChartMixin() {}

    BaseChartMixin.prototype.initialize = ['invokeIfDefined',
        function(invokeIfDefined) {
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    BaseChartMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;

        chart.dimension(widgetData.dimension)
            .group(widgetData.group);

        invoke(raw, chart, 'width');
        invoke(raw, chart, 'minWidth');
        invoke(raw, chart, 'height');
        invoke(raw, chart, 'minHeight');
        invoke(raw, chart, 'transitionDuration');
    };
})(angular);