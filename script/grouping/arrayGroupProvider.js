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