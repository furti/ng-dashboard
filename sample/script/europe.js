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
    var europeGroup = {
        title: 'Members of the European parliament',
        name: 'europe',
        dataUrl: './sample/data/europe.json',
        filters: [{
            type: 'checkbox',
            dimension: 'd.gender',
            labelAccessor: 'v === "M" ? "Male" : "Female"'
        }],
        widgets: [{
            title: 'By Group',
            name: 'group',
            type: 'piechart',
            width: 200,
            height: 200,
            dimension: 'd.eugroup',
            group: {
                type: 'sum',
                parameters: {
                    value: '1'
                }
            },
            innerRadius: 20,
            radius: 70,
            colors: {
                type: 'category10'
            }
        }, {
            title: 'By Country',
            name: 'country',
            type: 'barchart',
            width: 544,
            height: 200,
            dimension: 'd.country',
            x: {
                type: 'ordinal'
            },
            xUnits: {
                type: 'ordinal'
            },
            group: {
                type: 'sum',
                parameters: {
                    value: '1'
                }
            },
            margins: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 50
            },
            elasticY: true,
            yAxisLabel: '#MEPs',
            brushOn: false,
            outerPadding: 0,
            gap: 1
        }]
    };

    angular.module('dashboard')
        .constant('europe', europeGroup);

})(angular);