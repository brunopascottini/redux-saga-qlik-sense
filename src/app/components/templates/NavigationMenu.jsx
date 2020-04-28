import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const Navigation = styled.div`
  #calibrateLogo {
    position: absolute;
    z-index: 1;
    left: 100px;
    width: 100px;
    height: 50px;
    margin: 5px;
  }
  nav {
    position: relative;
    display: flex;
    width: 100vw;
    height: 60px;
    justify-content: center;
    background-color: #20232a;
    ul {
      list-style-type: none;
      display: flex;
      justify-content: space-evenly;
      align-self: center;
      width: 50%;
      li {
        width: 150px;
        text-align: center;
        padding: 10px 15px;
        font-size: 1.3rem;
        a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          text-transform: uppercase;
          font-family: ${(props) => props.fontMontserrat};
          &:hover {
            color: #b7d02e;
          }
        }
      }
    }
  }
  #toggleThemeButton {
    display: flex;
    position: absolute;
    z-index: 1;
    margin: 15px;
    top: 0px;
    right: 30px;
    input {
      background-color: ${(props) => props.buttonColor};
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 0.16em solid grey;
      &:active {
        outline: 0;
      }
    }
    p {
      color: white;
      position: relative;
      font-size: 1rem;
      font-family: ${(props) => props.fontMontserrat};
      // text-transform: uppercase;
      margin: 5px;
      align-self: center;
    }
  }
`

const NavigationMenu = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const links = [
    { link: '/', text: 'home' },
    { link: '/product', text: 'product' },
    { link: '/salesrep', text: 'sales rep' },
  ]
  return (
    <Navigation buttonColor={theme.buttons.backgroundColor} fontMontserrat={theme.fonts.montserrat}>
      <a href='https://calibrateconsulting.com/' target='_blank' rel='noopener noreferrer'>
        <img
          id='calibrateLogo'
          src='https://calibrateconsulting.com/wp-content/uploads/2019/08/small.png'
          alt='Calibrate Consulting Logo'
        />
      </a>
      <nav>
        <ul>
          {links.map((d) => (
            <li key={d.link + d.text}>
              <Link to={d.link}>{d.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div id='toggleThemeButton'>
        <input type='button' onClick={() => dispatch({ type: 'CHANGE_THEME' })} />
        <p>Change theme</p>
      </div>
    </Navigation>
  )
}

export default NavigationMenu
