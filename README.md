ng-dashboard
============

Create dashboards with AngularJS

See [furti.github.io/ng-dashboard](http://furti.github.io/ng-dashboard) for a live example and [Wiki](https://github.com/furti/ng-dashboard/wiki)
for documentation.

###General
ng-dashboard enables you to create dashboards with different widgets in about 10 lines of javascript code.
To do this it uses angular directives that are configured with an object that describes the dashboard and it's data.

Along the lines of Goethe's FAUST: Enough words have been exchanged; Now at last let me see some deeds!
So let's start with a litte example.

###Example
To get started you need the following libraries:
* [AngularJS](https://angularjs.org/)
* [D3.js](http://d3js.org/)
* [Crossfilter](http://square.github.io/crossfilter/)
* [DC.js](http://dc-js.github.io/dc.js/)
* [Bootstrap](http://getbootstrap.com) for styling
* and last but not least [ng-dashboard](https://github.com/furti/ng-dashboard)

To get started we create a ```index.html``` file with the imports for our required libraries.

**ng-dashboard.js is not combined yet. You have to import all files from the script folder to get started**

```html
<!DOCTYPE html>
<html lang="de" ng-app="dashboard">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ng-dashboard</title>

    <link href="style/bootstrap.css" rel="stylesheet">
    <link href="style/dc.css" rel="stylesheet">
    <link href="style/ng-dashboard.css" rel="stylesheet">
</head>

<body ng-controller="ChartController as chart">
    <widget-group group-data="chart.group"></widget-group>

    <script src="script/angular.js"></script>
    <script src="script/d3.js"></script>
    <script src="script/crossfilter.js"></script>
    <script src="script/dc.js"></script>
    <script src="script/ng-dashboard.js"></script>
    
    <!-- load the script that contains our module -->
    <script src="script/dashboard.js"></script>
</body>

</html>
```

The only thing we do here, except from initializing angular with a ```dashboard``` module, is to define the widget-group directive and
tell it which configuration data to use. This directive handles everything for us.

The next thing we have to do is to define our module in ```dashboard.js```

```javascript
//Our module depends on the ngDashboard module
var dashboard = angular.module('dashboard', ['ngDashboard']);

dashboard.controller('ChartController', [function() {
    this.group = {
        title: 'Sample Data',
        data: [{
            "Expt":1,
            "Run":1,
            "Speed":850
        },{
            "Expt":1,
            "Run":2,
            "Speed":740
        },{
            "Expt":1,
            "Run":3,
            "Speed":900
        },{
            "Expt":1,
            "Run":4,
            "Speed":1070
        }],
        widgets: [{
            title: 'Line Chart',
            type: 'line',
            width: 350,
            height: 200,
            dimension: 'd.Run',
            group: {
                type: 'sum',
                parameters: {
                    value: 'v.Speed * v.Run / 1000'
                }
            },
            x: 'linear({"domain": [0, 20]})'
        }]
    };
}]);
```

And that is it. Nothing more or less. That is everything you need to create your first simple chart. With more or less usefull data :)
You may say that we wrote more than 10 lines of javascript code. But think about loading the configuration object from a server.
Then we create our dashboard in less than 10 lines of javascript code ;)

```javascript
$http({
    method: 'GET',
    url: '/widgetdata'
}).success(function(data){
    controller.group = data;
});
```