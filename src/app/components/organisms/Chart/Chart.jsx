import React, { useRef, useEffect } from 'react'

import BarChart from '../../molecules/BarChart'
import PieChart from '../../molecules/PieChart'
import ScatterPlot from '../../molecules/ScatterPlot'
import KPIChart from '../../molecules/KPIChart'
import TableChart from '../../molecules/TableChart'
// import GaugeChart from '../molecules/GaugeChart'
import Tooltip from '../../molecules/Tooltip'

const chartTypes = {
  barchart: BarChart,
  kpi: KPIChart,
  piechart: PieChart,
  scatterplot: ScatterPlot,
  table: TableChart,
  // gauge: GaugeChart,
}

const Chart = (props) => {
  const {
    data, // Store
    isLoading, // Store
    model, // Store
    layout, // Store
    type, // Store
    theme, // Store
    objectId, // from Parent to get Qlik Object
    chartId, // from Parent
    propChartType, // create Qlik Object
    dimensions, // create Qlik Object
    measures, // create Qlik Object
    customProps, // create Qlik Object
    getObjectForChartId, // Actions
    createObjectForChartId, // Actions
    removeQlikObjectForChart, // Actions
  } = props

  const chartType = useRef()
  useEffect(() => {
    if (isLoading) {
      if (objectId) {
        getObjectForChartId(objectId, chartId)
      } else {
        let def = {
          qDimensions: dimensions.map((x) => {
            return {
              qDef: { qFieldDefs: [x.field] },
              qNullSuppression: x.excludeNull ? true : false,
            }
          }),
          qMeasures: measures.map((x) => {
            const f = { qDef: { qDef: x.formula, qLabel: x.label } }
            return x.sorting ? { ...f, qSortBy: x.sorting } : f
          }),
          qInterColumnSortOrder: [1, 0],
          qInitialDataFetch: [
            {
              qTop: 0,
              qLeft: 0,
              qWidth: dimensions.length + measures.length,
              qHeight: 100,
            },
          ],
        }
        createObjectForChartId('cube', def, propChartType, chartId)
      }
    }
    return () => !isLoading && removeQlikObjectForChart(chartId)
  }, [
    chartId,
    createObjectForChartId,
    dimensions,
    getObjectForChartId,
    isLoading,
    measures,
    model,
    objectId,
    propChartType,
    removeQlikObjectForChart,
  ])

  // RENDER SECTION
  if (!isLoading && type) {
    const RenderComponent = chartTypes[type]
    if (!chartType) {
      throw new Error(`Invalid Chart type :${type}`)
    }
    return (
      <div className='chartContainer'>
        <RenderComponent
          data={data}
          onDimensionClick={(d) => console.log(d)}
          TooltipComponent={Tooltip}
          customProps={customProps}
          theme={theme}
        />
      </div>
    )
  }

  return null
}

export default Chart
