import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Header, Toggler } from '../Header';
import { Sidebar } from '../Sidebar';
import { IoMdClose } from 'react-icons/io';
import HeaderSearch from './HeaderSearch';

describe('<Header /> test', () => {
  it('should toggle sidebar', () => {
    const wrapper = mount(<MemoryRouter><Header /></MemoryRouter>);
    expect(wrapper.find(Sidebar).props().open).toBeFalsy();
    wrapper.find(Toggler).first().simulate('click');
    expect(wrapper.update().find(Sidebar).props().open).toBeTruthy();
  });

  it('should toggle the search', () => {
    const wrapper = mount(<MemoryRouter><HeaderSearch /></MemoryRouter>);
    expect(wrapper.find(IoMdClose)).toHaveLength(0);
    wrapper.find(Toggler).simulate('click');
    jest.useFakeTimers();
    jest.runTimersToTime(300);
    expect(wrapper.update().find(IoMdClose)).toHaveLength(1);
  });
});