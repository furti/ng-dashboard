(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('conditional', new ConditionalGroupProvider());
        }
    ]);

    function ConditionalGroupProvider() {}

    ConditionalGroupProvider.prototype.initialize = ['$parse', '$log',
        function($parse, $log) {
            this.$parse = $parse;
            this.$log = $log;
        }
    ];

    ConditionalGroupProvider.prototype.buildGroup = function(groupParams, debug) {
        if (!groupParams) {
            throw 'conditional needs a groupParam';
        }

        return conditionalGroupBuilder(groupParams, this.$parse, debug, this.$log);
    };

    function conditionalGroupBuilder(groupParams, $parse, debug, $log) {
        var conditions = prepare(groupParams.conditions, $parse);
        var addHandlers = prepare(groupParams.handlers.add, $parse);
        var removeHandlers = prepare(groupParams.handlers.remove, $parse);

        var conditionalGroup = {
            init: function() {
                var initData = angular.copy(groupParams.init);

                if (debug) {
                    $log.info(initData);
                }

                return initData;
            },
            add: function(p, v) {
                handleConditions(conditions, addHandlers, {
                    p: p,
                    v: v
                });

                return p;
            },
            remove: function(p, v) {
                handleConditions(conditions, removeHandlers, {
                    p: p,
                    v: v
                });

                return p;
            }
        };


        return conditionalGroup;
    }

    function handleConditions(conditions, handlers, context) {
        if (handlers.pre) {
            angular.forEach(handlers.pre, function(preHandler) {
                preHandler.setter(context, preHandler.getter(context));
            });
        }

        for (var conditionKey in conditions) {
            if (conditions[conditionKey](context)) {
                for (var handlerKey in handlers[conditionKey]) {
                    var handler = handlers[conditionKey][handlerKey];
                    handler.setter(context, handler.getter(context));
                }

                break;
            }
        }

        if (handlers.post) {
            angular.forEach(handlers.post, function(postHandler) {
                postHandler.setter(context, postHandler.getter(context));
            });
        }
    }

    function prepare(expressions, $parse) {
        var prepared = {};

        angular.forEach(expressions, function(expression, key) {
            if (angular.isObject(expression)) {
                var preparedObject = {};

                angular.forEach(expression, function(e, k) {
                    preparedObject[k] = {
                        setter: $parse(k).assign,
                        getter: $parse(e)
                    };
                });

                prepared[key] = preparedObject;
            } else {
                prepared[key] = $parse(expression);
            }
        });

        return prepared;
    }
})(angular);