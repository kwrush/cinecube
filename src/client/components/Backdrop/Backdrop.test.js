import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Modal } from 'reactstrap';
import { Backdrop } from '../Backdrop';
import { Poster } from '../Poster';
import { mount } from 'enzyme';

const mockData = {
  index: 0,
  id: 100,
  videoId: 'abcd',
  mediaType: 'movie',
  voteAverage: 6.2,
  title: 'Blade Runner 2049',
  posterPath: '/poster.jpg',
  backdropPath: '/backdrop.jpg',
  genreIds: [
    9648,
    878,
    53
  ],
  overview: "Blade runner.",
  releaseDate: '2017-10-5'
};

const mountBackdrop = (entities) => {
  return mount(
    <MemoryRouter>
      <Backdrop mediaEntities={entities}/>
    </MemoryRouter>
  );
}

describe('Test <Backdrop />', () => {
  it('should return a React component ', () => {
    expect(typeof Backdrop).toBe('function');
  });

  it('should render Poster component when mounted', () => {
    const wrapper = mountBackdrop([mockData]);
    expect(wrapper.find(Poster)).toHaveLength(1);
  });

  it('should open modal dialog when clicking on the poster', () => {
    const wrapper = mountBackdrop([mockData]);
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find(Poster).simulate('click');
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
});