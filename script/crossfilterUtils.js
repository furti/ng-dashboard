(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('crossfilterUtils', [

        function() {
            var groupFunctionProviders = {};

            this.addGroupFunctionProvider = function(functionName, provider) {
                groupFunctionProviders[functionName] = provider;
            };


            this.$get = ['$parse', 'widgetExpressionParser',
                function($parse, widgetExpressionParser) {

                    return {
                        dimensionFunction: function(expression) {
                            return dimensionFunction($parse(expression));
                        },
                        groupFunctions: function(expression) {
                            var groupData = widgetExpressionParser.parse(expression);

                            if (!groupFunctionProviders[groupData.functionName]) {
                                throw 'No groupfunction provider for ' + groupData.functionName + ' registered';
                            }

                            return groupFunctionProviders[groupData.functionName](prepareGroupParams($parse, groupData.parameters));
                        }
                    };
                }
            ];
        }
    ]);

    function prepareGroupParams($parse, paramObject) {
        for (var key in paramObject) {
            paramObject[key] = $parse(paramObject[key]);
        }

        return paramObject;
    }

    function dimensionFunction(getter) {
        function value(d) {
            return getter({
                d: d
            });
        }

        return value;
    }

})(angular);