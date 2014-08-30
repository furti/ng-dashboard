(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['scaleParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerScaleProvider('linear', new LinearScaleProvider());
        }
    ]);

    function LinearScaleProvider() {}

    LinearScaleProvider.prototype.initialize = ['invokeIfDefined',
        function(invokeIfDefined) {
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    LinearScaleProvider.prototype.createScale = function(scaleParams) {
        var scale = d3.scale.linear();
        var invoke = this.invokeIfDefined;

        invoke(scaleParams, scale, 'domain');
        invoke(scaleParams, scale, 'range');
        invoke(scaleParams, scale, 'rangeRound');
        invoke(scaleParams, scale, 'clamp');
        invoke(scaleParams, scale, 'ticks');

        return scale;
    };
})(angular);