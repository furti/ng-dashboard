(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('crossfilterUtils', [

        function() {
            var groupFunctionProviders = {};

            this.addGroupFunctionProvider = function(type, provider) {
                groupFunctionProviders[type] = provider;
            };


            this.$get = ['widgetExpressionParser', '$injector',
                function(widgetExpressionParser, $injector) {

                    angular.forEach(groupFunctionProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });


                    return {
                        dimensionFunction: function(expression) {
                            if (!expression) {
                                throw 'Expression is required to create crossfilter dimension';
                            }

                            return widgetExpressionParser.valueFunction(expression);
                        },
                        groupFunctions: function(groupData) {
                            if (!groupData) {
                                throw 'Expression is required to create crossfilter group';
                            }

                            if (!groupFunctionProviders[groupData.type]) {
                                throw 'No groupfunction provider for ' + groupData.type + ' registered';
                            }

                            return groupFunctionProviders[groupData.type].buildGroup(groupData.parameters, groupData.debug);
                        }
                    };
                }
            ];
        }
    ]);
})(angular);