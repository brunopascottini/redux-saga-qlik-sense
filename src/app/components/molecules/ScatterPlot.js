import React, { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({ data, TooltipComponent, onDimensionClick, customProps, theme }) => {
  // console.log('Scatter Plot', data)
  data = data.filter((d) => d.measures[1].value !== 0)
  const formating = customProps.format || ''
  // Custom props section
  const colorData = customProps.color || theme.charts.data.scatterPlot

  const AxisFormat = useCallback((number) => d3.format(formating)(number).replace('G', 'B'), [
    formating,
  ])
  const chartRef = useRef(null)
  const marginChartRef = useRef(null)
  const xAxisRef = useRef(null)
  const yAxisRef = useRef(null)
  const lineDataRef = useRef(null)
  const toolTipRef = useRef(null)
  // Variables section
  const dimensions = { maxWidth: window.screen.availWidth / 2, maxHeight: 400 }
  const margin = { top: 50, right: 50, bottom: 50, left: 80 }
  const innerWidth = dimensions.maxWidth - margin.left - margin.right
  const innerHeight = dimensions.maxHeight - margin.top - margin.bottom
  const xValue = (d) => d.measures[0].value
  const yValue = (d) => d.measures[1].value

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(data.map(yValue)) * 1.1, 0])
    .range([0, innerHeight])
    .nice()
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data.map(xValue)) * 0.9, d3.max(data.map(xValue)) * 1.1])
    .range([0, innerWidth])
    .nice()

  // X Axis useEffect
  useEffect(() => {
    const xAxisGroup = d3.select(xAxisRef.current)
    xAxisGroup
      .attr('class', 'xAxisGroup')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
    xAxisGroup.selectAll('text').transition().attr('fill', theme.fonts.color)
    xAxisGroup.selectAll('line').attr('stroke-width', '1px').attr('stroke', 'grey')
    xAxisGroup.select('.domain').attr('stroke-width', '1px').attr('stroke', 'grey')
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
  }, [AxisFormat, innerWidth, yScale, theme])

  // Data useEffect
  useEffect(() => {
    const svg = d3.select(chartRef.current)
    svg.attr('width', dimensions.maxWidth).attr('height', dimensions.maxHeight)
    svg
      .select('.chartTitle')
      .attr('x', dimensions.maxWidth / 2)
      .attr('y', margin.top / 2)
      .text(`${data[0].measures[1].label} by ${data[0].measures[0].label}`)
      .transition()
      .attr('text-anchor', 'middle')
      .attr('font-family', theme.fonts.montserrat)
      .attr('fill', theme.fonts.color)
    const chart = d3.select(marginChartRef.current)
    chart.attr('transform', `translate(${margin.left}, ${margin.top})`)

    let tooltip = d3.select(toolTipRef.current)
    const dataGroup = d3.select(lineDataRef.current)
    const dataItems = dataGroup.attr('class', 'DataGroup').selectAll('circle').data(data)
    dataItems
      .join('circle')
      .on('mouseover', function (d) {
        // console.log(d.dimensions[0].value)
        d3.select(this).style('opacity', 1)
        tooltip.style('opacity', 1)
        tooltip.select('.title').text(d.dimensions[0].value)
        tooltip.select('.content').text('')
        d.measures.forEach((x) => {
          tooltip
            .select('.content')
            .append('span')
            .html(
              `${x.label} - ${
                x.value > 1 ? AxisFormat(x.value) : Math.round(x.value * 1000) / 1000
              }</br>`
            )
        })
      })
      .on('mousemove', function (d) {
        tooltip.style(
          'transform',
          `translate(${xScale(xValue(d))}px,${-innerHeight + yScale(yValue(d)) - 40}px)`
        )
      })
      .on('mouseout', function (d) {
        tooltip.style('opacity', 0)
        d3.select(this).style('opacity', 0.5)
      })
      .on('click', (d) => {
        onDimensionClick(d)
      })
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('r', 5)
      .attr('opacity', 0.5)
      .transition()
      .attr('fill', colorData)
      // .duration(750)
      // .delay((d, i) => i * 1)
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('cy', (d) => yScale(yValue(d)))
  }, [
    AxisFormat,
    colorData,
    data,
    dimensions,
    innerHeight,
    innerWidth,
    margin.left,
    margin.top,
    onDimensionClick,
    xScale,
    yScale,
    theme,
  ])
  return (
    <>
      <svg ref={chartRef}>
        <text className='chartTitle' />
        <g ref={marginChartRef}>
          <g ref={xAxisRef} />
          <g ref={yAxisRef} />
          <g ref={lineDataRef} />
        </g>
      </svg>
      <TooltipComponent ref={toolTipRef} />
    </>
  )
}

export default ScatterPlot
