import React from 'react'
import styled from 'styled-components'
const TooltipContainer = styled.div`
  position: absolute;
  text-align: center;
  z-index: 10;
  opacity: 0;
  font-size: 1em;
  padding: 6px 16px 7px 16px;
  background-color: rgba(30, 30, 30, 0.65);
  color: #fff;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  pointer-events: none;
  .title {
    font-size: 1.1em;
    font-weight: 600;
  }
  .content {
    font-size: 0.9em;
  }
`

const Tooltip = React.forwardRef((props, ref) => (
  <TooltipContainer ref={ref}>
    <span className='title' />
    <div className='content' />
  </TooltipContainer>
))

export default Tooltip
