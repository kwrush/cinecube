import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Test <Logo />', () => {

  it('should render svg Logo with the given color and size', () => {
    const wrapper = shallow(<Logo color="#00FFEE" size={40} />);
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper.find('svg').props().width).toEqual(40);
    expect(wrapper.find('path').props().fill).toBe('#00FFEE');
  });
});