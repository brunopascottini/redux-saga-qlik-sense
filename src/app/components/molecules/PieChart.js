import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { formatData } from '../../utils/d3/formatData'

const PieChart = ({ data, TooltipComponent, onDimensionClick, customProps, theme }) => {
  data = data.filter((d) => d.dimensions[0].value !== undefined)
  const formating = customProps.format || ''
  // console.log('Pie Chart', data)

  const dimensions = { maxWidth: window.screen.availWidth / 2, maxHeight: 400 }
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const innerWidth = dimensions.maxWidth - margin.left - margin.right
  const innerHeight = dimensions.maxHeight - margin.top - margin.bottom
  const radius = Math.min(innerHeight, innerWidth) / 2
  const getValue = (d) => d.measures[0].value

  const chartRef = useRef(null)
  const marginChartRef = useRef(null)
  const itemDataRef = useRef(null)
  const toolTipRef = useRef(null)

  // Data section
  useEffect(() => {
    const svg = d3.select(chartRef.current)
    svg.attr('width', dimensions.maxWidth).attr('height', dimensions.maxHeight)
    svg
      .select('.chartTitle')
      .attr('x', dimensions.maxWidth / 2)
      .attr('y', margin.top / 2)
      .text(`${data[0].measures[0].label} by ${data[0].dimensions[0].label}`)
      .transition()
      .attr('font-family', theme.fonts.montserrat)
      .attr('text-anchor', 'middle')
      .attr('fill', theme.fonts.color)

    const chart = d3.select(marginChartRef.current)
    chart.attr('transform', `translate(${dimensions.maxWidth / 2}, ${dimensions.maxHeight / 2})`)
    let tooltip = d3.select(toolTipRef.current)
    const dataGroup = d3.select(itemDataRef.current)

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateOrRd)
      .domain([0, d3.max(data.map(getValue))])

    let pie = d3.pie().value(getValue)
    let data_ready = pie(data)
    let arcGenerator = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius)

    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 1.4)

    // Paths (slices) sector
    dataGroup
      .select('.paths')
      .selectAll('path')
      .data(data_ready)
      .join('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(radius * 0.67) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr('fill', (d) => colorScale(d.data.measures[0].value))
      .attr('stroke', 'black')
      .style('stroke-width', '0.5px')
      .style('opacity', 0.8)
      .on('click', (d) => onDimensionClick(d.data))
      .on('mouseover', function (d) {
        // console.log(d)
        tooltip.style('opacity', 1)
        d3.select(this).style('opacity', 0.5)
        tooltip.select('.title').text(d.data.dimensions[0].value)
        tooltip.select('.content').text(formatData(d.data.measures[0].value, formating))
        tooltip.style(
          'transform',
          `translateX(calc(${dimensions.maxWidth / 2}px - 50%)) translateY(calc(${
            -dimensions.maxHeight / 2
          }px - 50%))`
        )
      })
      .on('mouseout', function (d) {
        tooltip.style('opacity', 0)
        d3.select(this).style('opacity', 0.8)
      })
    dataGroup
      .select('.paths')
      .selectAll('path')
      .transition()
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(radius * 0.67) // This is the size of the donut hole
          .outerRadius(radius)
      )

    // Lines sector
    dataGroup
      .select('.lines')
      .selectAll('polyline')
      .data(data_ready)
      .join('polyline')
      .style('fill', 'none')
      .transition()
      .attr('stroke', theme.fonts.color)
      .attr('stroke-width', 0.4)
      .attr('points', (d) => {
        if (d.endAngle - d.startAngle > Math.PI / 12) {
          const posA = arcGenerator.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          let posC = outerArc.centroid(d) // Label position = almost the same as posB
          var midangle = (d.endAngle + d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 1.2 * (midangle < Math.PI ? 1 : -1) // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        }
      })

    // Labels sector
    dataGroup
      .select('.labels')
      .selectAll('text')

      .data(data_ready)
      .join('text')
      .transition()

      .text((d) => {
        if (d.endAngle - d.startAngle > Math.PI / 12) return d.data.dimensions[0].value
      })
      .attr('transform', (d) => {
        let pos = outerArc.centroid(d)
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 1.25 * (midangle < Math.PI ? 1 : -1)
        return 'translate(' + pos + ')'
      })
      .style('text-anchor', (d) => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return midangle < Math.PI ? 'start' : 'end'
      })
      .attr('y', '0.32em')
      .style('font-size', 16)
      .attr('font-family', theme.fonts.montserrat)
      .attr('fill', theme.fonts.color)
  }, [data, dimensions, formating, margin, onDimensionClick, radius, theme])
  return (
    <>
      <svg ref={chartRef}>
        <text className='chartTitle' />
        <g ref={marginChartRef}>
          <g className='data' ref={itemDataRef}>
            <g className='paths' />
            <g className='labels' />
            <g className='lines' />
          </g>
        </g>
      </svg>
      <TooltipComponent ref={toolTipRef} />
    </>
  )
}

export default PieChart
