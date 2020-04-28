import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const IntroContainer = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.color};
  /* margin-top: 10vh; */
  h1 {
    margin: 30px;
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
    margin: 30px;
  }
  h3 {
    font-size: 1.5em;
  }
  h4 {
    margin: 10px;
  }
`

const Home = () => {
  const theme = useSelector((state) => state.theme)
  return (
    <IntroContainer color={theme.fonts.color}>
      <h1>Bruno's Mashup aiming Project Work at Calibrate Consulting</h1>
      <h2>Technologies: React, Redux, Enigma (QIX) and D3.</h2>
      <h3>
        Objective: Develop web page integrated with Qlik app containing features that will be
        required on client-side.
      </h3>
      <h3>This is part of a learning curve in multiple levels of technical complexity.</h3>
      <h4>
        Focus: Navigation, Interaction, Features, Code reusability, Styling, Dark and Light Themes.
      </h4>
    </IntroContainer>
  )
}

export default Home
