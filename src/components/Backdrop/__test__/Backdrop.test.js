import React from 'react';
import Backdrop from '../index';
import { shallow, mount } from 'enzyme';

const mockData = {
  backdropUrl: '/backdrop.jpg',
  posterUrl: '/posterUrl.jpg',
  title: 'Backdrop',
  subTitle: 'Subtitle of Backdrop'
};

describe('Test <Backdrop />', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render <Backdrop /> without errors', () => {
    const wrapper = shallow(<Backdrop />);
    expect(wrapper.instance()).not.toBe(null);
  });

  // it('should animate entering of the poster', () => {
  //   const wrapper = mount(<Backdrop {...mockData} active={true} />);
  //   jest.runTimersToTime(300);

  //   expect(wrapper.find(<div className="backdrop-group-enter"></div>)).toHaveLength(1);
  //   expect(wrapper.find(<div className="title-group-enter"></div>)).toHaveLength(0);
  // });

  // it('should animate entering of titles after the poster entered', () => {
  //   const wrapper = mount(<Backdrop {...mockData} active={true} />);
  //   jest.runTimersToTime(200);

  //   expect(wrapper.find(<div className="backdrop-group-enter-active"></div>)).toBeDefined();
  // })

  // it('should not render backdrop group if it is not active', () => {

  // });
});