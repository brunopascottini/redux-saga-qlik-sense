import React from 'react'
import styled from 'styled-components'
import CheckIcon from './logos/check.svg'

const SelectionButton = styled.button`
  position: relative;
  top: 0px;
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.buttonFunction === 'accept' ? 'green' : 'red')};
  /* background: url(${(props) =>
    props.buttonFunction === 'accept' ? CheckIcon : ''})  no-repeat fixed center; */
`

export const AcceptSelectionButton = ({ onClick }) => {
  return <SelectionButton buttonFunction='accept' onClick={onClick}></SelectionButton>
}
export const EndSelectionButton = ({ onClick }) => {
  return <SelectionButton buttonFunction='end' onClick={onClick}></SelectionButton>
}
