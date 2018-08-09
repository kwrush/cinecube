import React, { cloneElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Backdrop from '../index';
import { shallow, mount } from 'enzyme';

const mockData = {
  "id": 335984,
  "mediaType": "movie",
  "rating": 6.2,
  "title": "Blade Runner 2049",
  "posterUrl": "/poster.jpg",
  "backdropUrl": "/backdrop.jpg",
  "genreIds": [
    9648,
    878,
    53
  ],
  "releaseDate": "2017-10-5"
};

describe('Test <Backdrop />', () => {

  it('should call onEntering when the transition is triggered.', () => {

    const onEntering = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Backdrop {...mockData} onEntering={onEntering} />
      </MemoryRouter>
    );

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { active: true })
    });

    expect(onEntering).toHaveBeenCalled();
  });

  it('should call onAllEntered when transitions of all children are finished', () => {
    
    jest.useFakeTimers();
    const allEntered = jest.fn();

    const wrapper = mount(
      <MemoryRouter>
        <Backdrop {...mockData} onAllEntered={allEntered} />
      </MemoryRouter>
    );

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { active: true })
    });

    jest.runTimersToTime(300);

    expect(allEntered).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(allEntered).toHaveBeenCalled();
  });

});