import React from 'react'
import styled, { keyframes } from 'styled-components'
import ReactLogo from './logos/react_logo.svg'
import ReduxLogo from './logos/redux_logo.svg'
import QlikLogo from './logos/qlik_logo.png'
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 5s linear infinite;
`
const Centered = styled.div`
  display: block;
  margin: auto 50%;
  transform: translateX(-50%);
  height: 100vh;
  width: 40vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Loading = () => {
  return (
    <Centered>
      <Rotate>
        <img src={ReactLogo} alt='React Logo' />
      </Rotate>
      <Rotate>
        <img src={ReduxLogo} alt='Redux Logo' />
      </Rotate>
      <Rotate>
        <img height='60px' width='auto' src={QlikLogo} alt='Qlik Logo' />
      </Rotate>
    </Centered>
  )
}

export default Loading
