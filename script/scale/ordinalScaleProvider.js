(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['scaleParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerScaleProvider('ordinal', new OrdinalScaleProvider());
        }
    ]);

    function OrdinalScaleProvider() {}
    OrdinalScaleProvider.prototype.initialize = ['invokeIfDefined',
        function(invokeIfDefined) {
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    OrdinalScaleProvider.prototype.createScale = function(scaleParams) {
        var scale = d3.scale.ordinal();
        var invoke = this.invokeIfDefined;

        if (scaleParams) {
            invoke(scaleParams, scale, 'domain');
            invoke(scaleParams, scale, 'range');
        }

        return scale;
    };

})(angular);