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

Creates a [dc.js linechart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#line-chart). A linechart uses the ```Basechart Mixin```, ```Stack Mixin```, ```Color Mixin```, ```Coordinate Grid Mixin ``` and the ```Margin Mixin```.
The correspondent sections describe all available properties for this mixins.

The linechart also defines some additional properties.

```renderArea``` A boolean that defines if the areas below the lines should be filled.

```renderDataPoints``` Defines if dots should be shown for each datapoint.

```interpolate``` a string naming the interpolator used for drawing lines. See [d3.svg.line.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate) and [d3.svg.area.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_interpolate) for valid values.

***barchart***

Creates a [dc.js barchart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bar-chart). A barchart uses the ```Basechart Mixin```, ```Stack Mixin```, ```Color Mixin```, ```Coordinate Grid Mixin ``` and the ```Margin Mixin```.
The correspondent sections describe all available properties for this mixins.

***piechart***

Creates a [dc.js piechart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bar-chart). A piechart uses the ```Basechart Mixin``` and the ```Color Mixin```.
The correspondent sections describe all available properties for this mixins.

The piechart also defines some additional properties.

```slicesCap``` defines the maximum number of slices the pie chart displays.

```innerRadius``` sets the inner radius in px. If greater than 0 a doghnut chart is rendered.

```radius``` sets the outer radius of the chart in px.

```cx``` the center x of the chart.

```cy``` the center y of the chart.

```minAngleForLabel``` defines the minimun angle a slice must have to show a label.

***boxPlot***

Creates a [dc.js boxplot](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#box-plot). A boxplot uses the ```Basechart Mixin```, ```Color Mixin```, ```Coordinate Grid Mixin ``` and the ```Margin Mixin```.
The correspondent sections describe all available properties for this mixins.

***heatmap***

Creates a [dc.js heatmap](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#heat-map). A heatmap uses the ```Basechart Mixin```, ```Color Mixin``` and the ```Margin Mixin```.
The correspondent sections describe all available properties for this mixins.

###Basechart Mixin

```dimension``` a angular expression that is used to create the [crossfilter dimension](https://github.com/square/crossfilter/wiki/API-Reference#dimension) for the chart. See Dimensions for more informations.

```group``` A configuration object that is used to reduce a [crossfilter group](https://github.com/square/crossfilter/wiki/API-Reference#group_reduce) out of the dimension. See Groups for more informations.

```width``` sets the width of the chart in px.

```minWidth``` sets the minimun width for the chart.

```height``` sets the height of the chart in px.

```minHeight``` sets the minimum height for the chart.

###Color Mixin

###Coordinate Grid Mixin

```brushOn``` boolean that defines if brushing is enabled or disabled. If brushing is on the user can drag the mouse accross the chart to filter the data based on the selection.

###Margin Mixin

###Stack Mixin

###Color Mixin


###Dimensions
The dimension expression is used inside the value function of the crossfilter dimension to calculate the return value.
Context for the expression is an object that contains the data parameter from crossfilter as the ```d``` property.

The crossfilter contians following data (Example is taken from the crossfilter documentation)

```javascript
[
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
  {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
];
```

If we want to create a dimension by total paiment we can use this expression:

```javascript
{
    ...
    dimension: 'd.total'
    ...
}
```

This will result in the same dimension as if created like this:

```javascript
    crossfilter.dimension(function(d){
        return d.total;
    });
```


###Groups
The group object is used to create the ```init```, ```add``` and ```reomve``` functions needed for the reduce function of a crossfilter group.
The config object needs two properties. The ***functionName*** property is used to determine the grouping function to use. And the ***parameters*** property is used to configure the function. The content of this property depends on the grouping function.

You can define a ```name``` for a group. This name is used as the name of the group inside the chart.

####Available group functions
***sum***

The sum functions sums up alle the values for the value expression for the dimension.

***array***

***conditional***