import React from 'react';
import { shallow, mount } from 'enzyme';
import { CarouselItem } from 'reactstrap';
import  BackdropCarousel from './BackdropCarousel';
import ResponsiveCarousel from './ResponsiveCarousel';
import { chunk } from 'lodash';
import { Backdrop } from '../Backdrop';

const entity = {
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

const entities = new Array(8).fill(null).map((e, i) => Object.assign({}, entity, { index: i, id: i }));

const mountCarousel = (itemPerSlice = 4) => {
  return shallow(<BackdropCarousel mediaEntities={chunk(entities, itemPerSlice)} />);
}

const mountResponsive = () => {
  return mount(<ResponsiveCarousel mediaEntities={entities} />);
}

describe('<BackdropCarousel /> Tests', () => {

  it('should return a React component', () => {
    expect(typeof BackdropCarousel).toBe('function');
  });

  it('should render 2 slices', () => {
    const wrapper = mountCarousel();
    expect(wrapper.find(CarouselItem)).toHaveLength(2);
  });

  it('should add active index by 1', () => {
    const wrapper = mountCarousel();
    wrapper.instance().nextSlice();
    expect(wrapper.state().activeIndex).toBe(1);
  });

  it('should minus 1 from active index', () => {
    const wrapper = mountCarousel(2);
    wrapper.setState({
      activeIndex: 2
    });
    wrapper.instance().prevSlice();
    expect(wrapper.state().activeIndex).toBe(1);
  });

  it('goes from the last slice to the first one', () => {
    const wrapper = mountCarousel(4);
    wrapper.setState({
      activeIndex: 1
    });
    wrapper.instance().nextSlice();
    expect(wrapper.state().activeIndex).toBe(0);
  });

  it('goes from the first slice to the last one', () => {
    const wrapper = mountCarousel(4);
    wrapper.instance().prevSlice();
    expect(wrapper.state().activeIndex).toBe(1);
  });

  it('should go to the initial index when mounted', () => {
    const wrapper = mount(
      <BackdropCarousel initialIndex={2} mediaEntities={chunk(entities, 2)}/>
    );

    expect(wrapper.update().state().activeIndex).toBe(2);
  })
});

describe('<ResponsiveCarousel /> Tests', () => {

  it('should return a React component', () => {
    expect(typeof ResponsiveCarousel).toBe('function');
  });

  it('should render 2 slices', () => {
    const wrapper = mountResponsive();
    expect(wrapper.find(Backdrop)).toHaveLength(2);
  });

  it('should give the correct initial index when fewer items on a slice', () => {
    const wrapper = mountResponsive();
    wrapper.instance()._activeIndex = 1;
    wrapper.instance()._itemPerSlice = 4;
    const res = wrapper.instance().calculateInitialIndex(2);
    expect(res).toBe(2);
  });

  it('should give the correct intital index when more items on a slice', () => {
    const wrapper = mountResponsive();
    wrapper.instance()._activeIndex = 3;
    wrapper.instance()._itemPerSlice = 2;
    const res = wrapper.instance().calculateInitialIndex(4);
    expect(res).toBe(1);
  });
});