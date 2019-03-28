import React from 'react';
import { shallow, mount } from 'enzyme';
import { SidebarNav } from '../SidebarNav';

describe('<SidebarNav /> test', () => {
  it('should hide sidebar when show is false', () => {
    const wrapper = shallow(<SidebarNav show={false} />);
    expect(wrapper.find('.sidebar.show')).toHaveLength(0);
  });

  it('should show sidebar when show is true', () => {
    const wrapper = shallow(<SidebarNav show />);
    expect(wrapper.find('.sidebar.show')).toHaveLength(1);
  });

  it('should not render close button if onClose is not provided', () => {
    const wrapper = shallow(<SidebarNav show />);
    expect(wrapper.find('.close-btn')).toHaveLength(0);
  });

  it('should render close button if onClose is not provided', () => {
    const wrapper = shallow(<SidebarNav show onClose={() => {}} />);
    expect(wrapper.find('.close-btn')).toHaveLength(1);
  });

  it('should call onClose when clicks button', () => {
    const onClick = jest.fn();
    const wrapper = mount(<SidebarNav show onClose={onClick} />);
    wrapper.find('.close-btn').first().simulate('click');
    expect(onClick).toBeCalled();
  });
});