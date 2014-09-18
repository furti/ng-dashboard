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
    var dashboard = angular.module('dashboard', ['ngDashboard']);

    dashboard.controller('ChartController', ['crime', 'experiments', 'europe',

        function(crime, experiments, europe) {
            this.intro = {
                title: 'ng-dashboard',
                name: 'intro',
                widgets: [{
                    name: 'intro',
                    type: 'raw',
                    content: 'This sample page uses data from <a href="https://github.com/dc-js/dc.js/tree/master/web" target="_blank">dc.js</a>'
                }]
            };

            this.experiments = experiments;
            this.crime = crime;
            this.europe = europe;
        }
    ]);
})(angular);