import React from 'react';
import { shallow } from 'enzyme';
import { MediaOverview } from '.';

describe('<MediaOverview /> test', () => {
  it('should render nothing if media is null or empty object', () => {
    const wrapper = shallow(<MediaOverview />);
    expect(wrapper.type()).toEqual(null);
    wrapper.setProps({ media: {} });
    expect(wrapper.type()).toEqual(null);
  });
})