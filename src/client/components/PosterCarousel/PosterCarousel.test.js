import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PosterCarousel } from '.';
import { CarouselItem } from 'reactstrap';

const media = {
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
const entities = new Array(12).fill(media).map((m, i) => Object.assign({}, {id: i}, m));
window.testMediaQueryValues = {value: 767}
describe('<PosterCarousel /> test', () => {
  it('should render 3 slices', () => {
    const wrapper = mount(<MemoryRouter><PosterCarousel mediaEntities={entities} /></MemoryRouter>);
    expect(wrapper.find(CarouselItem)).toHaveLength(3);
  });

  it('should render 6 slices when window width < 768px', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PosterCarousel mediaEntities={entities} _values={{ width: 700 }} />
      </MemoryRouter>
    );
    expect(wrapper.find(CarouselItem)).toHaveLength(6);
  });
});