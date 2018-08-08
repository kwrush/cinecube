import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import PosterBox from '../index';

function createPosterBox (props) {
  return (
    <MemoryRouter>
      <PosterBox
        posterUrl="/123.jpg" 
        linkUrl="/123"
        title="123"
        { ...props }
      />
    </MemoryRouter>
  );
}

describe('Test the <PosterBox />', () => {

  it('should not render the tooltip if tooltip is false.', () => {
    const wrapper = mount(createPosterBox({ tooltip: false }));
    expect(wrapper.find(UncontrolledTooltip).exists()).toBe(false);
  });
});