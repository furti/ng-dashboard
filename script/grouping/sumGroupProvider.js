(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('sum', new SumGroupProvider());
        }
    ]);

    function SumGroupProvider() {}

    SumGroupProvider.prototype.initialize = ['$parse',
        function($parse) {
            this.$parse = $parse;
        }
    ];

    SumGroupProvider.prototype.buildGroup = function(groupParams) {
        if (!groupParams) {
            throw 'sum needs a groupParam';
        }

        return sumGroupBuilder(this.$parse(groupParams.value));
    };

    function sumGroupBuilder(valuGetter) {
        var sumGroup = {
            init: function() {
                return 0;
            },
            add: function(p, v) {
                var val = valuGetter({
                    v: v
                });

                return p + val;
            },
            remove: function(p, v) {
                var val = valuGetter({
                    v: v
                });

                return p - val;
            }
        };


        return sumGroup;

    }
})(angular);