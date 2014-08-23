(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('array', new ArrayGroupProvider());
        }
    ]);

    function ArrayGroupProvider() {}

    ArrayGroupProvider.prototype.initialize = ['$parse',
        function($parse) {
            this.$parse = $parse;
        }
    ];

    ArrayGroupProvider.prototype.buildGroup = function(groupParams) {
        if (!groupParams) {
            throw 'sum needs a groupParam';
        }

        return arrayGroupBuilder(this.$parse(groupParams.value));
    };

    function arrayGroupBuilder(getter) {
        var arrayGroup = {
            init: function() {
                return [];
            },
            add: function(p, v) {
                var val = getter({
                    v: v
                });

                p.push(val);

                return p;
            },
            remove: function(p, v) {
                var val = getter({
                    v: v
                });

                p.splice(p.indexOf(val), 1);

                return p;
            }
        };

        return arrayGroup;
    }
})(angular);