import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Landing from '../pages/Landing'

Enzyme.configure({ adapter: new Adapter() })

test('renders without crashing', () => {
  shallow(<Landing />)
})
