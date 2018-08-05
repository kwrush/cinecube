import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import Poster from '../index';

describe('Test <Poster />', () => {
  it('should  render tooltip if state.poster is not null.', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Poster 
          posterUrl="/123.jpg"
          linkUrl="/123"
          title="123"
        />
      </MemoryRouter>
    );
    expect(wrapper.find(Poster).state.poster).not.toBe(null);
    expect(wrapper.find(Tooltip)).toBeDefined();
  })
})