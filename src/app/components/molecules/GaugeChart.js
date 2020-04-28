import React, { useRef } from 'react'

const GaugeChart = ({ data, TooltipComponent, onDimensionClick }) => {
  console.log(data)
  const chartRef = useRef(null)
  const marginChartRef = useRef(null)
  const itemDataRef = useRef(null)
  const toolTipRef = useRef(null)
  return (
    <>
      <svg ref={chartRef}>
        <text className='chartTitle' />
        <g ref={marginChartRef}>
          <g className='data' ref={itemDataRef}></g>
        </g>
      </svg>
      <TooltipComponent ref={toolTipRef} />
    </>
  )
}

export default GaugeChart
