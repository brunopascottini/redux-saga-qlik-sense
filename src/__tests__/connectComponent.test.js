import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../app/reducers'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ConnectedChart from '../app/components/organisms/Chart'

describe('Componend connected to Redux store', () => {
  Enzyme.configure({ adapter: new Adapter() })
  const store = createStore(rootReducer)
  it('<Chart /> with objectId', () => {
    function setup() {
      const props = {
        objectId: 'MEAjCJ',
        chartId: 'ABC123',
        customProps: { format: '.4s' },
      }
      const enzymeWrapper = mount(
        <Provider store={store}>
          <ConnectedChart {...props} />
        </Provider>
      )
      return {
        props,
        enzymeWrapper,
      }
    }
    const { enzymeWrapper, props } = setup()
    console.log(props)
    console.log(enzymeWrapper.debug()) // Improve test
    expect(enzymeWrapper).not.toBeNull()
  })
  it('<Chart /> with custom measures and dimensions', () => {
    function setup() {
      const props = {
        chartId: 'ABC123',
        propChartType: 'kpi',
        measures: [
          {
            formula: 'Sum([Sales Amount])',
            label: 'Sales Margin',
          },
        ],
        dimensions: [],
        customProps: { format: '.5s' },
      }
      const enzymeWrapper = mount(
        <Provider store={store}>
          <ConnectedChart {...props} />
        </Provider>
      )
      return {
        props,
        enzymeWrapper,
      }
    }
    const { enzymeWrapper, props } = setup()
    console.log(props)
    console.log(enzymeWrapper.debug()) // Improve test
    expect(enzymeWrapper).not.toBeNull()
  })
})
