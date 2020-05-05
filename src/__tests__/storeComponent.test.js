import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../app/reducers'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../app/components/templates/Home'

describe('Component that depends on store', () => {
  Enzyme.configure({ adapter: new Adapter() })
  const store = createStore(rootReducer)
  it('<Home />', () => {
    function setup() {
      const enzymeWrapper = mount(
        <Provider store={store}>
          <Home />
        </Provider>
      )
      return {
        enzymeWrapper,
      }
    }
    const { enzymeWrapper } = setup()
    // console.log(enzymeWrapper.find('div h1').text())
    expect(enzymeWrapper.find('div h1').text()).toBe(
      `Bruno's Mashup aiming Project Work at Calibrate Consulting`
    )
    expect(enzymeWrapper.find('div h2').text()).toBe(
      `Technologies: React, Redux, Enigma (QIX) and D3.`
    )
  })
})
