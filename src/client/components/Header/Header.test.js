import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';

describe('<Header /> test', () => {
  it('should hide search input initially', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header-search-input.show')).toHaveLength(0);
  });

  it('should show search input when click the search button', () => {
    const wrapper = mount(<MemoryRouter><Header /></MemoryRouter>);
    wrapper.find('button.search-toggler').first().simulate('click');
    expect(wrapper.update().find('.header-search-input.show')).toHaveLength(1);
  });
});