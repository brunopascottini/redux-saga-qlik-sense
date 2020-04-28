import React from 'react'
import ChartGrid from '../atoms/ChartGrid'
import Chart from '../organisms/Chart/'
import { v4 as uuidv4 } from 'uuid'

const ChartSalesRep = () => {
  return (
    <ChartGrid>
      <Chart
        propChartType='barchart'
        chartId={uuidv4()}
        measures={[
          {
            formula: 'Sum([Sales Quantity]*[Sales Price])',
            label: 'Revenue',
            sorting: { qSortByNumeric: -1 },
          },
        ]}
        dimensions={[{ field: 'Sales Rep Name', excludeNull: true }]}
        customProps={{ format: '.2s' }}
      />
      {/* Custom Bar Chart */}
      <Chart
        propChartType='scatterplot'
        chartId={uuidv4()}
        measures={[
          {
            formula: 'Avg([Lead Time])',
            label: 'Average Lead Time',
          },
          {
            formula: 'Sum([Sales Amount])',
            label: 'Sales Margin',
          },
        ]}
        dimensions={[{ field: 'Sales Rep Name', excludeNull: true }]}
        customProps={{ format: '.2s' }}
        /* customProps={{ color: '#171b84', format: '.2s' }} */
      />
      {/* Custom ScatterPlot */}
      <Chart
        propChartType='table'
        chartId={uuidv4()}
        measures={[
          {
            formula: 'Sum({$<[Year]={"2006"}>}[Sales Amount])',
            label: 'LY Sales',
          },
          {
            formula: 'Sum ([Sales Amount])',
            label: 'TY Sales',
          },
          {
            formula:
              'Sum({$ <[Region Name]={"Central"}> }[Sales Margin Amount])/Sum({$ <[Region Name]={"Central"}> }[Sales Amount])',
            label: 'Central Margin',
          },
        ]}
        dimensions={[{ field: 'Sales Rep Name', excludeNull: true }]}
        customProps={{ format: '$.3s' }}
      />
    </ChartGrid>
  )
}

export default ChartSalesRep
