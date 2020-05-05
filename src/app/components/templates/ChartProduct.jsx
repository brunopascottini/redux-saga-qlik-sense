import React from 'react'
import ChartGrid from '../atoms/ChartGrid'
import Chart from '../organisms/Chart/'
import { v4 as uuidv4 } from 'uuid'

const ChartProduct = () => {
  return (
    <ChartGrid>
      <Chart objectId='MRmuW' chartId={uuidv4()} customProps={{ color: '#777', format: '.3s' }} />
      {/* Bar Chart */}
      <Chart objectId='MEAjCJ' chartId={uuidv4()} customProps={{ format: '.4s' }} />
      {/* Pie Chart */}
      <Chart
        chartId={uuidv4()}
        propChartType='kpi'
        measures={[
          {
            formula: 'Sum([Sales Amount])',
            label: 'Sales Margin',
          },
        ]}
        dimensions={[]}
        customProps={{ format: '.5s' }}
      />
      {/* KPI Indicator */}

      <Chart
        objectId='bsxkrg'
        chartId={uuidv4()}
        customProps={{ color: '#E76D5A', format: '.2s' }}
      />
      {/* Scatter Plot */}
    </ChartGrid>
  )
}

export default ChartProduct
