(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['unitsParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerUnitProvider('ordinal', new OrdinalUnitsProvider());
        }
    ]);

    function OrdinalUnitsProvider() {}

    OrdinalUnitsProvider.prototype.createUnit = function() {
        return dc.units.ordinal;
    };
})(angular);