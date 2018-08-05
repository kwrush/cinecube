import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SearchBox from '../index';
import Suggestions from '../../Suggestions';

const mockData = [
  {
    type: 'movie',
    items: [
      { url: '/m1', imgUrl: '#m1', title: 'movie1' },
      { url: '/m2', imgUrl: '#m2', title: 'movie2' }
    ]
  },
  {
    type: 'tv',
    items: [
      { url: '/t1', imgUrl: '#t1', title: 'tv1' },
      { url: '/t2', imgUrl: '#t2', title: 'tv2' }
    ]
  }
];

jest.useFakeTimers();

describe('Test </SearchBox />', () => {

  it('should not render suggestions when searchbox has focus but no value', () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper.state('showSuggestions')).toBe(false);
    wrapper.simulate('focus');
    expect(wrapper.state('showSuggestions')).toBe(false);
  });

  it('should show suggestions when the searchbox has focus and value', () => {
    const wrapper = mount(<SearchBox />);
    wrapper.instance().refs.input.value = 'something';

    wrapper.find('input').simulate('focus');

    expect(wrapper.state('showSuggestions')).toBe(true);
    expect(wrapper.find(Suggestions)).toHaveLength(1);
  });
  
  it('should hide suggestions when the searchbox is blurred', () => {
    const wrapper = mount(<SearchBox />);

    wrapper.instance().refs.input.value = 'something';
    wrapper.find('input').simulate('focus');

    expect(wrapper.state('showSuggestions')).toBe(true);

    wrapper.find('input').simulate('blur');

    expect(wrapper.state('showSuggestions')).toBe(false);
    expect(wrapper.find(Suggestions)).toHaveLength(0);
  });

  it('should call handleSelectItem when clicking on suggestions', () =>{
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <SearchBox searchResults={mockData} />
      </MemoryRouter>
    );

    const sb = wrapper.find(SearchBox).instance();
    const clickSpy = jest.spyOn(sb, 'handleSelectItem');

    // have to call update to make sure spyOn works
    wrapper.update();

    sb.refs.input.value = 'searching';
    wrapper.find('input').simulate('focus');
    wrapper.find('li').at(0).simulate('click');

    expect(clickSpy).toBeCalled();
  });
});