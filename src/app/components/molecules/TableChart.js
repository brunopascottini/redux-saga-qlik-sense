import React from 'react'
import styled from 'styled-components'
import { formatData } from '../../utils/d3/formatData'

const Table = styled.table`
  display: block;
  height: 400px;
  overflow-y: scroll;
  #tdDimension {
    cursor: pointer;
    text-align: left;
    background-color: ${(props) => props.firstColumn};
    border-right: 0.5px solid ${(props) => props.firstColumnBorder};
    &:hover {
      background-color: ${(props) => props.hover};
    }
  }
  td {
    text-align: center;
    font-size: 1.25em;
    padding: 3.5px;
  }
  th {
    padding: 5px 20px;
    font-size: 1.5rem;
    font-weight: 600;
  }
  td,
  th {
    color: ${(props) => props.color};
    border-collapse: collapse;
    font-family: 'Roboto', sans-serif;
  }
  thead {
    border-bottom: 0.5px solid ${(props) => props.headBorder};
  }
`

const TableChart = ({ data, onDimensionClick, customProps, theme }) => {
  //   data = data.filter(d => d.measures.map(x => typeof x.value == 'number')) // Improve reusability
  data = data.filter((d) => typeof d.measures[2].value == 'number')

  const formating = customProps.format || ''

  return (
    <Table
      hover={theme.table.hover}
      firstColumn={theme.table.firstColumn}
      firstColumnBorder={theme.table.border}
      color={theme.fonts.color}
      headBorder={theme.table.border}
    >
      <thead>
        <tr>
          <th>{data[0].dimensions[0].label}</th>
          {data[0].measures.map((d) => (
            <th key={d.label}>{d.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.qElemNumber}>
            <td id='tdDimension' onClick={() => onDimensionClick(d)}>
              {d.dimensions[0].value}
            </td>
            {d.measures.map((x) => (
              <td key={x.value}>
                {x.value > 1 ? formatData(x.value, formating) : x.value.toPrecision(3)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableChart
