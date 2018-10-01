import React from 'react';
import Header from '../Header';
import StickyHeader from '../StickyHeader';
import shouldToggleOrScrollHeader from '../shouldToggleOrScrollHeader';
import { shallow } from 'enzyme';

describe('Regular header test', () => {
  it('should render childen when passed in', () => {
    const wrapper = shallow((
      <Header>
        <div className="child"></div>
      </Header>
    ));

    expect(wrapper.contains(<div className="child"></div>)).toBeTruthy();
  }); 
});

describe('Sticky header test', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow((
      <StickyHeader>
        <div className="child"></div>
      </StickyHeader>
    ));

    expect(wrapper.contains(<div className="child"></div>)).toBeTruthy();
  });

  it('should keep scrolling when header is unfixed and not passed.', () => {
    const resDown = shouldToggleOrScrollHeader({ status: 'unfixed', wrapperHeight: 64 }, 0, 20);
    const resUp = shouldToggleOrScrollHeader({ status: 'unfixed', wrapperHeight: 64 }, 40, 20);
    expect(resDown).toBe('none');
    expect(resUp).toBe('none');
  });

  it('should unpin if has passed unfixed header and is scrolling down', () => {
    const res = shouldToggleOrScrollHeader({ status: 'unfixed', wrapperHeight: 64 }, 50, 68);
    expect(res).toBe('unpin');
  });

  it('should pin header while scrolling up and is already unpinned', () => {
    const res = shouldToggleOrScrollHeader({ status: 'unpinned', wrapperHeight: 64 }, 200, 150);
    expect(res).toBe('pin');
  });

  it('should unpin header while scrolling down and is already pinned', () => {
    const res = shouldToggleOrScrollHeader({ status: 'pinned', wrapperHeight: 64 }, 100, 120);
    expect(res).toBe('unpin');
  });

  it('should do nothing when scrolling down and is already unpinned', () => {
    const res = shouldToggleOrScrollHeader({ status: 'unpinned', wrapperHeight: 64 }, 90, 100);
    expect(res).toBe('none');
  });

  it('should do nothing when scrolling up and is already pinned', () => {
    const res = shouldToggleOrScrollHeader({ status: 'pinned', wrapperHeight: 64 }, 200, 150);
    expect(res).toBe('none');
  });
});