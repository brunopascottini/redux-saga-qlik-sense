import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as d3 from 'd3'

const BarChart = ({ data, TooltipComponent, onDimensionClick, customProps, theme }) => {
  // Custom properties section
  const dataColor = customProps.color || theme.charts.data.barChart
  const formating = customProps.format || ''

  // Variables section
  const dimensions = { maxWidth: window.screen.availWidth / 2, maxHeight: 400 }
  const margin = { top: 50, right: 50, bottom: 130, left: 80 }
  const innerWidth = dimensions.maxWidth - margin.left - margin.right
  const innerHeight = dimensions.maxHeight - margin.top - margin.bottom
  const miniInnerHeight = dimensions.maxHeight - innerHeight - margin.bottom
  const xValue = (d) => d.dimensions[0].value
  const yValue = (d) => d.measures[0].value
  const AxisFormat = useCallback((number) => d3.format(formating)(number).replace('G', 'B'), [
    formating,
  ])
  // useRef section
  const chartRef = useRef(null)
  const marginChartRef = useRef(null)
  const xAxisRef = useRef(null)
  const yAxisRef = useRef(null)
  const barDataRef = useRef(null)

  const miniMarginChartRef = useRef(null)
  const miniBarDataRef = useRef(null)

  const toolTipRef = useRef(null)
  // Hooks session
  const [brushedData, setBrushedData] = useState([])
  // const previousBrush = usePrevious(brushedData)

  // Scales section
  // Regular
  const yScale = d3
    .scaleLinear()
    .domain([d3.max(brushedData.map(yValue)), 0]) // brushedData
    .range([0, innerHeight])
    .nice()
  const xScale = d3
    .scaleBand()
    .domain(brushedData.map(xValue)) // brushedData
    .range([0, innerWidth])
    .padding(0.3)
  // Mini
  const yScaleMini = d3
    .scaleLinear()
    .domain([d3.max(data.map(yValue)), 0])
    .range([0, miniInnerHeight])
    .nice()
  const xScaleMini = d3.scaleBand().domain(data.map(xValue)).range([0, innerWidth]).padding(0.3)

  useEffect(() => {
    setBrushedData(data)
  }, [data])

  // Chart useEffect
  useEffect(() => {
    const svg = d3.select(chartRef.current)
    svg.attr('width', dimensions.maxWidth).attr('height', dimensions.maxHeight)
    svg
      .select('.chartTitle')
      .attr('x', dimensions.maxWidth / 2)
      .attr('y', margin.top / 2)
      .text(`${data[0].measures[0].label} by ${data[0].dimensions[0].label}`)
      .transition()
      .attr('text-anchor', 'middle')
      .attr('font-family', theme.fonts.montserrat)
      .attr('fill', theme.fonts.color)

    const chart = d3.select(marginChartRef.current)
    chart.attr('transform', `translate(${margin.left}, ${margin.top})`)
    const miniChart = d3.select(miniMarginChartRef.current)
    miniChart.attr('transform', `translate(${margin.left}, ${innerHeight + margin.bottom})`)
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [innerWidth, miniInnerHeight],
      ])
      .on('start brush end', () => {
        if (d3.event.selection) {
          const indexMin = d3.event.selection[0]
          const indexMax = d3.event.selection[1]
          const eachBand = xScaleMini.step()
          const finalIndex = Math.round(indexMax / eachBand)
          const startingIndex = Math.round(indexMin / eachBand)
          // setBrushPosition([indexMin, indexMax])
          let newData = []
          for (let index = startingIndex; index < finalIndex; index++) {
            newData.push(data[index])
          }
          setBrushedData(newData)
        }
      })
    miniChart.select('.brush').call(brush)
  }, [
    brushedData,
    data,
    dimensions,
    innerHeight,
    innerWidth,
    margin,
    miniInnerHeight,
    xScaleMini,
    theme,
  ])

  // X Axis useEffect
  useEffect(() => {
    const xAxisGroup = d3.select(xAxisRef.current)
    xAxisGroup
      .attr('class', 'xAxisGroup')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', `rotate(-45) translate(-5,-5)`)
      .attr('font-size', '0.9em')
      .attr('text-anchor', 'end')
      .transition()
      .attr('fill', theme.fonts.color)
    xAxisGroup.selectAll('line').attr('stroke-width', '1px').attr('stroke', theme.fonts.color)
    xAxisGroup.select('.domain').attr('stroke-width', '1px').attr('stroke', theme.fonts.color)
    xAxisGroup.selectAll('text').attr('font-family', theme.fonts.roboto)
  }, [innerHeight, xScale, theme])

  // Y Axis useEffect
  useEffect(() => {
    const yAxisGroup = d3.select(yAxisRef.current)
    yAxisGroup
      .attr('class', 'yAxisGroup')
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(AxisFormat))
    yAxisGroup.selectAll('text').transition().attr('fill', theme.fonts.color)
    yAxisGroup.selectAll('line').attr('stroke-width', '1px').attr('stroke', 'grey')
    yAxisGroup.select('.domain').attr('stroke-width', '1px').attr('stroke', 'grey')
    yAxisGroup.selectAll('text').attr('font-family', theme.fonts.roboto)
  }, [innerWidth, AxisFormat, yScale, theme])

  // Data useEffect
  useEffect(() => {
    let tooltip = d3.select(toolTipRef.current)
    const dataGroup = d3.select(barDataRef.current)
    const miniDataGroup = d3.select(miniBarDataRef.current)

    const miniDataBars = miniDataGroup.attr('class', 'miniDataGroup').selectAll('rect').data(data)
    const dataBars = dataGroup.attr('class', 'DataGroup').selectAll('rect').data(brushedData)
    miniDataBars
      .join('rect')
      // .attr('scale', -1)
      .attr('x', (d) => xScaleMini(xValue(d)))
      .attr('y', (d) => yScaleMini(yValue(d)))
      .attr('width', xScaleMini.bandwidth())
      .attr('height', (d) => miniInnerHeight - yScaleMini(yValue(d)))
      .transition()
      .attr('fill', dataColor)
    dataBars
      .join('rect')
      .on('click', (d) => {
        onDimensionClick(d)
      })
      .on('mouseover', function (d) {
        d3.select(this).style('opacity', 0.7)
        tooltip.style('opacity', 1)
        tooltip.select('.title').text(d.dimensions[0].value)
        tooltip.select('.content').text('')
        d.measures.forEach((x) => {
          tooltip
            .select('.content')
            .append('span')
            .html(`${x.label} - £ ${AxisFormat(x.value)}</br>`)
        })
      })
      .on('mousemove', function (d) {
        tooltip.style(
          'transform',
          `translate(${xScale(xValue(d)) + 80}px,${
            -dimensions.maxHeight + +yScale(yValue(d)) - 2
          }px)`
        )
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0)
        d3.select(this).style('opacity', 1)
      })
      .attr('transform', 'scale(1,-1)')
      .style('z-index', 2)
      .attr('x', (d) => xScale(xValue(d)))
      .attr('y', -innerHeight)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', dataColor)
      .attr('height', (d) => innerHeight - yScale(yValue(d)))
  }, [
    AxisFormat,
    brushedData,
    dataColor,
    data,
    dimensions,
    innerHeight,
    miniInnerHeight,
    onDimensionClick,
    xScale,
    xScaleMini,
    yScale,
    yScaleMini,
  ])

  return (
    <>
      <svg ref={chartRef}>
        <text className='chartTitle' />
        <g ref={marginChartRef}>
          <g ref={xAxisRef} />
          <g ref={yAxisRef} />
          <g ref={barDataRef} />
        </g>
        <g ref={miniMarginChartRef}>
          <g ref={miniBarDataRef} />
          <g className='brush' />
        </g>
      </svg>
      <TooltipComponent ref={toolTipRef} />
    </>
  )
}
export default BarChart
