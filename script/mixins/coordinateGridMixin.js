(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('coordinateGridMixin', new CoordinateGridMixin());
        }
    ]);

    function CoordinateGridMixin() {}

    CoordinateGridMixin.prototype.initialize = ['scaleParser',
        function(scaleParser) {
            this.scaleParser = scaleParser;
        }
    ];

    CoordinateGridMixin.prototype.configureChart = function(chart, widgetData) {
        chart.x(this.scaleParser.parse(widgetData.rawData.x));

        setProperty(chart, widgetData.rawData, 'yAxisPadding');
        setProperty(chart, widgetData.rawData, 'yAxisLabel');
    };

    function setProperty(chart, data, property) {
        if (angular.isDefined(data[property])) {
            chart[property](data[property]);
        }
    }
})(angular);