/**
 * Copyright 2014 Daniel Furtlehner
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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