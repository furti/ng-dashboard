(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('bubbleoverlay', new BubbleOverlayProvider());
        }
    ]);

    function BubbleOverlayProvider() {}

    BubbleOverlayProvider.prototype.initialize = ['baseChartMixin', 'bubbleMixin', 'colorMixin', 'invokeIfDefined',
        function(baseChartMixin, bubbleMixin, colorMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.bubbleMixin = bubbleMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.colorMixin = colorMixin;
        }
    ];

    BubbleOverlayProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.bubbleOverlay(element[0], widgetData.widgetGroupName),
            raw = widgetData.rawData;

        chart.svg(d3.select(element.find('svg')[0]));

        this.baseChartMixin.configureChart(chart, widgetData);
        this.bubbleMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

        if (raw.points) {
            for (var i in raw.points) {
                var point = raw.points[i];

                chart.point(point.name, point.x, point.y);
            }
        }

        chart.render();

        return chart;
    };
})(angular);