ng-dashboard
============

Create dashboards with AngularJS

See [furti.github.io/ng-dashboard](http://furti.github.io/ng-dashboard) for a live example

###group-data
```javascript
{
    name: '<group name>', //The name of the group. Must be unique
    title: '<title for the group>', //If specified the title is shown above the chart group
    data: [...], //An array of data used to create the crossfilter for the charts. Only used if not dataUrl is specified
    dataUrl: '<Url>', //Url that is used to load the data for the crossfilter. NOT IMPLEMENTED YET
    charts: [
        {
            name: '<chart name>', //The name of the chart. Must be unique
            title: '<title for the chart', //If specified a title is shown for the chart
            width: <width>, //The width of the chart in pixels.
            height: <height>, //The height of the chart in pixels
            type: '<type>', //The chart type. NOT IMPLEMENTED YET
            group: '<group expression>', //Expression that is used to group the dimension for the chart. NOT IMPLEMENTED YET
            dimension: '<dimension expression>' //Expression that is used to create a dimension for the crossfilter. NOT IMPLEMENTED YET
        }
    ]
}
```

###dimension
The expression for a charts dimension can be any valid angular expression.
It is used inside the value function of the crossfilter dimension to calculate the return value.
Context for the expression is an object that contains the data object from crossfilter as the ```d``` property.

Example that creates a dimension that uses the total payments.

```javascript
var chartData = {
    name: 'payments',
    title: 'Payments',
    data: [
        {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"}
    ],
    charts:  [
        {
            name: 'totalpayments',
            title: 'Total Paymetns',
            dimension: 'd.total'
        }
    ]
}
```

###group
This expression is used to group the charts dimension.

```groupfunction(param1, param2,...)```

groupfunction is the name of the function used to group the dimension.
Each parameter must be a valid angular expression.

####Available group functions
* sum(value)
  The sum functions sums up alle the values for the value expression for the dimension.