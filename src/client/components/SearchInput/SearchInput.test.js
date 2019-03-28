import React from 'react';
import { mount } from 'enzyme';
import { SearchInput } from '../SearchInput';

describe('<SearchInput /> tests', () => {
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