import React from 'react';
import { mount } from 'enzyme';
import BackdropPoster from '../index';

describe('Test <BackdropPoster />', () => {

  it('should render image correctly and is not active.', () => {
    const wrapper = mount(<BackdropPoster posterUrl="/123.jpg" />);

    expect(wrapper.find({ src: '/123.jpg' })).toHaveLength(1);
    expect(wrapper.props().active).toBe(false);
  });

  it('should call onEntered when transition entered is trigged', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const wrapper = mount(<BackdropPoster onEntered={fn} />);

    wrapper.setProps({ active: true });
    
    jest.runAllTimers();

    expect(fn).toHaveBeenCalled();
  });
});