## superset-ui-plugin-chart-mapx

[![Version](https://img.shields.io/npm/v/superset-ui-plugin-chart-dummy.svg?style=flat-square)](https://img.shields.io/npm/v/superset-ui-plugin-chart-dummy.svg?style=flat-square)
[![David (path)](https://img.shields.io/david/apache-superset/superset-ui-plugins-template.svg?path=packages%2Fsuperset-ui-legacy-plugin-chart-dummy&style=flat-square)](https://david-dm.org/apache-superset/superset-ui-plugins-template?path=packages/superset-ui-legacy-plugin-chart-dummy)

This chart plugin provides a MapX vizualisation for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import MapXChartPlugin from 'superset-ui-plugin-chart-mapx';

new MapXChartPlugin()
  .configure({ key: 'mapx' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://unepgrid.ch/playground/superset/plugins-storybook/?path=/story/plugin-chart-mapx-mapxchartplugin) for more details.

```js
<SuperChart
  chartType="mapx"
  width={600}
  height={600}
  formData={...}
  queryData={{
    data: {...},
  }}
/>
```
