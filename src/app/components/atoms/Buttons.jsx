import React from 'react'
import styled from 'styled-components'
import CheckIcon from './logos/check.svg'
import CloseIcon from './logos/close.svg'

const SelectionButton = styled.button`
  position: relative;
  top: 0px;
  width: 35px;
  height: 25px;
  border: 0 solid black;
  border-radius: 3px;
  margin-right: 20px;
  /* background-color: ${(props) => (props.buttonFunction === 'accept' ? 'green' : 'red')}; */
  background: url(${(props) => (props.buttonFunction === 'accept' ? CheckIcon : CloseIcon)}) 
  ${(props) => (props.buttonFunction === 'accept' ? '#00D100' : '#F20000')} 
  center
  no-repeat;
`

export const AcceptSelectionButton = ({ onClick }) => {
  return <SelectionButton buttonFunction='accept' onClick={onClick}></SelectionButton>
}
export const EndSelectionButton = ({ onClick }) => {
  return <SelectionButton buttonFunction='end' onClick={onClick}></SelectionButton>
}
