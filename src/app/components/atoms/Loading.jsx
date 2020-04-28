import React from 'react'
import styled, { keyframes } from 'styled-components'
import ReactLogo from './react_logo.svg'
import ReduxLogo from './redux_logo.svg'
import QlikLogo from './qlik_logo.png'
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
  animation: ${rotate} 3.5s linear infinite;
`
const Centered = styled.div`
  height: 100vh;
  width: 100vw;
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
        <img height='130px' width='auto' src={QlikLogo} alt='Redux Logo' />
      </Rotate>
    </Centered>
  )
}

export default Loading
