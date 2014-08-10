ng-dashboard
============

Create dashboards with AngularJS

See [furti.github.io/ng-dashboard](http://furti.github.io/ng-dashboard) for a live example

###group-data
```javascript
{
    name: '<group name>', //The name of the group. Must be unique
    title: '<title for the group>', //If specified the title is shown above the widget group
    data: [...], //An array of data used to create the crossfilter for the widgets. Only used if not dataUrl is specified
    dataUrl: '<Url>', //Url that is used to load the data for the crossfilter. NOT IMPLEMENTED YET
    widgets: [
        {
            name: '<widget name>', //The name of the widget. Must be unique
            title: '<title for the widget', //If specified a title is shown for the widget
            width: <width>, //The width of the widget in pixels.
            height: <height>, //The height of the widget in pixels
            type: '<type>', //The widget type. NOT IMPLEMENTED YET
            group: '<group expression>', //Expression that is used to group the dimension for the widget. NOT IMPLEMENTED YET
            dimension: '<dimension expression>' //Expression that is used to create a dimension for the crossfilter. NOT IMPLEMENTED YET
        }
    ]
}
```

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