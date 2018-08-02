import React from 'react';
import SearchBox from '../index';
import { shallow } from 'enzyme';

describe('Test </SearchBox />', () => {
  it('should render searchbox', () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper.type()).toBe('div');
  });
});
