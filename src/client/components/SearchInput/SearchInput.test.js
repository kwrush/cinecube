import React from 'react';
import { mount } from 'enzyme';
import { SearchInput } from '../SearchInput';

describe('<SearchInput /> tests', () => {
  it('should set placeholder text', () => {
    const wrapper = mount(<SearchInput placeholderText="search something" />);
    expect(wrapper.find('input').props().placeholder).toEqual('search something')
  });

  it('should clear input value when clearValue is true', () => {
    const wrapper = mount(<SearchInput />);
    const input = wrapper.find('input').instance();
    input.value = 'Something';
    wrapper.setProps({ clearValue: true });
    expect(input.value).toEqual('');
  });

  it('should not do search when the query is empty', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<SearchInput onSearch={onSearch} />);
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('should do search when `Enter` is pressed', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<SearchInput onSearch={onSearch} />);

    const input = wrapper.find('input');
    input.instance().value = 'Something';
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(onSearch).toBeCalled();
  });
});