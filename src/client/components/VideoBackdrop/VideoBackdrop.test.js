import React from 'react';
import { mount } from 'enzyme';
import YouTube from 'react-youtube';
import { VideoBackdrop } from '../VideoBackdrop';
import { ProgressiveImage } from '../ProgressiveImage';

describe('<VideoBackdrop /> tests', () => {
  it('should return a function', () => {
    expect(typeof VideoBackdrop).toBe('function');
  });

  it('should show video by default', () => {
    const wrapper = mount(<VideoBackdrop />);
    expect(wrapper.find(YouTube)).toHaveLength(1); 
  });

  it('should hide video when showVideo is false', () => {
    const wrapper = mount(<VideoBackdrop showVideo={false} />);
    expect(wrapper.props().showVideo).toBeFalsy();
    expect(wrapper.find(YouTube)).toHaveLength(0); 
  });

  it('should mount the backdrop image while loading the video', () => {
    const wrapper = mount(<VideoBackdrop />);
    expect(wrapper.state().videoLoading).toBeTruthy();
    expect(wrapper.update().find(ProgressiveImage)).toHaveLength(1);
  });

  it('should unmount backrop image when the video is loaded', () => {
    const wrapper = mount(<VideoBackdrop />);
    wrapper.setState({
      videoLoading: false
    });
    expect(wrapper.update().find(ProgressiveImage)).toHaveLength(0);
  });
});