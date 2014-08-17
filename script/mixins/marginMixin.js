(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('marginMixin', new MarginMixin());
        }
    ]);

    function MarginMixin() {}

    MarginMixin.prototype.initialize = ['invokeIfDefined',
        function(invokeIfDefined) {
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    MarginMixin.prototype.configureChart = function(chart, widgetData) {
        this.invokeIfDefined(widgetData.rawData, chart, 'margins');
    };
})(angular);