(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('unitsParser', [

        function() {
            var unitProviders = {};

            this.registerUnitProvider = function(name, provider) {
                unitProviders[name] = provider;
            };

            this.$get = ['$injector',

                function($injector) {

                    angular.forEach(unitProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });

                    return new UnitParser(unitProviders);
                }
            ];
        }
    ]);

    function UnitParser(unitProviders) {
        this.unitProviders = unitProviders;
    }

    UnitParser.prototype.parse = function(unitData) {
        if (!this.unitProviders[unitData.type]) {
            throw 'No scaleprovider ' + unitData.type + ' registered';
        }

        return this.unitProviders[unitData.type].createUnit(unitData.parameters);
    };
})(angular);