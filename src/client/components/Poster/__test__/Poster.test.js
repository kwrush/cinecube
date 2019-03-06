import React from 'react';
import { mount } from 'enzyme';
import Poster from '../index';

describe('Test <Poster />', () => {

  it('should render the image correctly.', () => {
    const wrapper = mount(<Poster imageUrl="/123.jpg"/>);
    expect(wrapper.find({ src: '/123.jpg' })).toHaveLength(1);
  });
})