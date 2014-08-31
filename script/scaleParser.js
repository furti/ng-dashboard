(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('scaleParser', [

        function() {
            var scaleProviders = {};

            this.registerScaleProvider = function(name, provider) {
                scaleProviders[name] = provider;
            };

            this.$get = ['$injector',

                function($injector) {

                    angular.forEach(scaleProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });

                    return new ScaleParser(scaleProviders);
                }
            ];
        }
    ]);

    function ScaleParser(scaleProviders) {
        this.scaleProviders = scaleProviders;
    }

    ScaleParser.prototype.parse = function(scaleData) {
        if (!this.scaleProviders[scaleData.type]) {
            throw 'No scaleprovider ' + scaleData.type + ' registered';
        }

        return this.scaleProviders[scaleData.type].createScale(scaleData.parameters);
    };
})(angular);