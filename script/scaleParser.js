(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('scaleParser', [

        function() {
            var scaleProviders = {};

            this.registerScaleProvider = function(name, provider) {
                scaleProviders[name] = provider;
            };

            this.$get = ['widgetExpressionParser', '$injector',

                function(widgetExpressionParser, $injector) {

                    angular.forEach(scaleProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });

                    return new ScaleParser(scaleProviders, widgetExpressionParser);
                }
            ];
        }
    ]);

    function ScaleParser(scaleProviders, widgetExpressionParser) {
        this.scaleProviders = scaleProviders;
        this.widgetExpressionParser = widgetExpressionParser;
    }

    ScaleParser.prototype.parse = function(expression) {
        var scaleData = this.widgetExpressionParser.parse(expression);

        if (!this.scaleProviders[scaleData.functionName]) {
            throw 'No scaleprovider ' + scaleData.functionName + ' registered';
        }

        return this.scaleProviders[scaleData.functionName].createScale(scaleData.parameters);
    };
})(angular);