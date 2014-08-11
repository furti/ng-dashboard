(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('crossfilterUtils', [

        function() {
            var groupRegex = /^([^\(]*)\(([^\)]*)\).*$/;

            var groupFunctionProviders = {};

            this.addGroupFunctionProvider = function(functionName, provider) {
                groupFunctionProviders[functionName] = provider;
            };


            this.$get = ['$parse',
                function($parse) {

                    return {
                        dimensionFunction: function(expression) {
                            return dimensionFunction($parse(expression));
                        },
                        groupFunctions: function(expression) {
                            var exParts = groupRegex.exec(expression);
                            var groupFunction = exParts[1];
                            var groupParams = prepareGroupParams($parse, exParts[2]);

                            if (!groupFunctionProviders[groupFunction]) {
                                throw 'No groupfunction provider for ' + groupFunction + ' registered';
                            }

                            return groupFunctionProviders[groupFunction](groupParams);
                        }
                    };
                }
            ];
        }
    ]);

    function prepareGroupParams($parse, paramString) {
        var paramObject = angular.fromJson(paramString);

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