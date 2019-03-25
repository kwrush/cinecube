import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '../Avatar';
import { ProgressiveImage } from '../ProgressiveImage';

describe('<Avatar /> test', () => {
  it('should render a <ProgressiveImage />', () => {
    const wrapper = shallow(<Avatar src={'./test.jpg'} />);
    expect(wrapper.find(ProgressiveImage)).toHaveLength(1);
  });

  it('should not have round and border class name', () => {
    const wrapper = shallow(<Avatar border={false} round={false} />);
    expect(wrapper.find('div').hasClass('border')).toBeFalsy();
    expect(wrapper.find('div').hasClass('round')).toBeFalsy();
  });

  it('should add round and border class name', () => {
    const wrapper = shallow(<Avatar border round />);
    expect(wrapper.find('div').hasClass('border'));
    expect(wrapper.find('div').hasClass('round'));
  });
});