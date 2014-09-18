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

        if (scaleParams) {
            invoke(scaleParams, scale, 'domain');
            invoke(scaleParams, scale, 'range');
            invoke(scaleParams, scale, 'rangeRound');
            invoke(scaleParams, scale, 'clamp');
            invoke(scaleParams, scale, 'ticks');
        }

        return scale;
    };
})(angular);