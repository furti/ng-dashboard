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
                            if (!expression) {
                                throw 'Expression is required to create crossfilter dimension';
                            }

                            return dimensionFunction($parse(expression));
                        },
                        groupFunctions: function(expression) {
                            if (!expression) {
                                throw 'Expression is required to create crossfilter group';
                            }

                            var groupData = widgetExpressionParser.parse(expression);

                            if (!groupFunctionProviders[groupData.functionName]) {
                                throw 'No groupfunction provider for ' + groupData.functionName + ' registered';
                            }

                            return groupFunctionProviders[groupData.functionName](groupData.parameters);
                        }
                    };
                }
            ];
        }
    ]);

    //    function prepareGroupParams($parse, paramObject) {
    //        for (var key in paramObject) {
    //            paramObject[key] = $parse(paramObject[key]);
    //        }
    //
    //        return paramObject;
    //    }

    function dimensionFunction(getter) {
        function value(d) {
            return getter({
                d: d
            });
        }

        return value;
    }

})(angular);