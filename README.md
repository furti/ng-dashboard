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
            type: '<type>', //The chart type.
            group: '<group expression>', //Expression that is used to group the dimension for the chart.
            dimension: '<dimension expression>' //Expression that is used to create a dimension for the crossfilter
        }
    ]
}
```