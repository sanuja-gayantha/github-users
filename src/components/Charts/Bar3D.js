import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Bar3D = ({data}) => {

  const chartConfigs = {
    type: 'bar3d',
    width: '100%',
    height: 400,
    dataFormat: 'json',
    dataSource:{
      "chart": {
        "caption": "Most Forks",
        // "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Repos",
        "yAxisName": "Forks",
        // "numberSuffix": "K",
        "theme": "ocean",
        // "decimals":0,
        // "doughnutRadius":"45%",
        // "showPercentValues": 0,
        "xAxisNameFontSize":"16px",
        "yAxisNameFontSize":"16px",

      },
      "data":data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;