(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('raw', new RawProvider());
        }
    ]);


    function RawProvider() {}

    RawProvider.prototype.createWidget = function(element, widgetData) {

        if (widgetData.rawData.content) {
            element.append(widgetData.rawData.content);
        }

        return element;
    };
})(angular);