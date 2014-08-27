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

        setIfPresent(scale, scaleParams, 'domain');
        setIfPresent(scale, scaleParams, 'range');
        setIfPresent(scale, scaleParams, 'rangeRound');
        setIfPresent(scale, scaleParams, 'clamp');
        setIfPresent(scale, scaleParams, 'ticks');

        return scale;
    };

    function setIfPresent(scale, paramObject, name) {
        if (paramObject[name]) {
            scale[name](paramObject[name]);
        }
    }

})(angular);