ng-dashboard
============

Create dashboards with AngularJS

See [furti.github.io/ng-dashboard](http://furti.github.io/ng-dashboard) for a live example

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
                functionName: 'sum',
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

###group-data Object
The group-data Object accepts the following properties.

***name*** ```required```

The name of the group. Must be unique if multiple groups are used.

***title***

The title that is shown above the widgets of the group. If not present no title is shown.

***data*** ```Either data or dataUrl is required```

An array of data used to create a crossfilter for the widget group.

***dataUrl*** ```Takes precedence over the data property```

A URL that is used to load the data for the crossfilter. Either data or dataUrl is required.

***widgets***

A Array of objects that describe the widgets to show. If empty nothing is shown.

###widget-data Object
The widget-data Object describes the widget type and its appearance. Each widget defines the following properties.
Other properties are required for each individual widget type.

***name*** ```required```

The name of the widget. Must be unique inside a widget-group.

***title***

The title that is shown above the widget. If not present no title is shown.

***width***

The width of a widget in pixel.

***height***

The height of a widget in pixel.

***type***

Defines which widget to display. See ```types``` for a list of supported types.

###Types

***linechart***
Creates a [dc.js linechart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#line-chart). A linechart uses the ```Basechart Mixin```, ```Stack Mixin```, ```Coordinate Grid Mixin ``` and the ```Margin Mixin```.
The correspondent sections describe all available properties for this mixins. See  for further informations.

The linechart also defines some additional properties.

```renderArea``` A boolean that defines if the areas below the lines should be filled.

```renderDataPoints``` Defines if dots should be shown for each datapoint.

```interpolate``` a string naming the interpolator used for drawing lines. See [d3.svg.line.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate) and [d3.svg.area.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_interpolate) for valid values.

***barchart***

***piechart***

***boxPlot***

###Basechart Mixin

###Color Mixin

###Coordinate Grid Mixin

```brushOn``` boolean that defines if brushing is enabled or disabled. If brushing is on the user can drag the mouse accross the chart to filter the data based on the selection.

###Margin Mixin

###Stack Mixin


###dimension
The expression for a widgets dimension can be any valid angular expression.
It is used inside the value function of the crossfilter dimension to calculate the return value.
Context for the expression is an object that contains the data object from crossfilter as the ```d``` property.

Example that creates a dimension that uses the total payments.

```javascript
var widgetData = {
    name: 'payments',
    title: 'Payments',
    data: [
        {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"}
    ],
    widgets:  [
        {
            name: 'totalpayments',
            title: 'Total Paymetns',
            dimension: 'd.total'
        }
    ]
}
```

###group
This expression is used to group the widgets dimension.

```groupfunction({"param1": "expression", "param2": "expression",...})```

groupfunction is the name of the function used to group the dimension.
Each parameter must be a valid angular expression.

####Available group functions
* sum({"value": "expression"})
  The sum functions sums up alle the values for the value expression for the dimension.