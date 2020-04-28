import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/templates/Home'
import ChartProduct from './components/templates/ChartProduct'
import ChartSalesRep from './components/templates/ChartSalesRep'
import NavigationMenu from './components/templates/NavigationMenu'
import Loading from './components/atoms/Loading'

const AppContainer = styled.div`
  width: 100vw;
  background-color: ${(props) => props.backgroundColor};
`

const App = () => {
  const qlik = useSelector((state) => state.qlik)
  const theme = useSelector((state) => state.theme)

  return qlik.success ? (
    <Router>
      <AppContainer className='App' backgroundColor={theme.body.backgroundColor}>
        <NavigationMenu />
        {/* <SelectionsBar /> */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/product' component={ChartProduct} />
          <Route path='/salesrep' component={ChartSalesRep} />
        </Switch>
      </AppContainer>
    </Router>
  ) : (
    <Loading />
  )
}

export default App
