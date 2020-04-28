import React from 'react'
import styled from 'styled-components'
import { formatData } from '../../utils/d3/formatData'

const KPI = styled.div`
  margin-top: 15%;
  text-align: center;
  font-family: ${(props) => props.font};
  color: ${(props) => props.color};
`

const KPIChart = ({ data, customProps, theme }) => {
  const formating = customProps.format || ''
  console.log()
  // console.log('KPI', data)
  const label = data[0].measures[0].label
  const value = data[0].measures[0].value
  return (
    <KPI font={theme.fonts.roboto} color={theme.fonts.color}>
      <h1 id='kpiLabel'>{label}</h1>
      <h1 id='kpiValue'>£ {formatData(value, formating)}</h1>
    </KPI>
  )
}

export default KPIChart
