import React, { cloneElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Backdrop from '../index';
import { mount } from 'enzyme';

const mockData = {
  index: 0,
  id: 335984,
  mediaType: 'movie',
  rating: 6.2,
  title: 'Blade Runner 2049',
  posterUrl: '/poster.jpg',
  backdropUrl: '/backdrop.jpg',
  genreIds: [
    9648,
    878,
    53
  ],
  releaseDate: '2017-10-5'
};

describe('Test <Backdrop />', () => {

  it('should call onChildrenEntered when transitions of children are finished', () => {
    
    jest.useFakeTimers();
    const allEntered = jest.fn();

    const wrapper = mount(
      <MemoryRouter>
        <Backdrop {...mockData} onChildrenEntered={allEntered} />
      </MemoryRouter>
    );

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { active: true })
    });

    // backdrop info is not entered at this moment
    jest.runTimersToTime(300);

    expect(allEntered).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(allEntered).toHaveBeenCalled();
  });
});