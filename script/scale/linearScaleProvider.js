(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['scaleParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerScaleProvider('linear', new LinearScaleProvider());
        }
    ]);

    function LinearScaleProvider() {}

    LinearScaleProvider.prototype.createScale = function(scaleParams) {
        var scale = d3.scale.linear();
        var evaluatedParams = scaleParams({});

        setIfPresent(scale, evaluatedParams, 'domain');
        setIfPresent(scale, evaluatedParams, 'range');
        setIfPresent(scale, evaluatedParams, 'rangeRound');
        setIfPresent(scale, evaluatedParams, 'clamp');
        setIfPresent(scale, evaluatedParams, 'ticks');

        return scale;
    };

    function setIfPresent(scale, paramObject, name) {
        if (paramObject[name]) {
            scale[name](paramObject[name]);
        }
    }

})(angular);