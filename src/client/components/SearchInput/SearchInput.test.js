import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { SearchInput } from '../SearchInput';

describe('<SearchInput /> tests', () => {
  it('should not submit search when the query is empty', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find(SearchInput).instance().state.onSubmit).toBeFalsy();
  });

  it('should submit search when `Enter` is pressed', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );

    const input = wrapper.find('input');
    input.instance().value = 'Something';
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find(SearchInput).instance().state.onSubmit).toBeTruthy();
  });
});