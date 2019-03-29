import React from 'react';
import { shallow, mount } from 'enzyme';
import { StarRating } from '../StarRating';
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io';

const shallowStarRating = (value = 0, max = 5, editable = false, hover = false) => {
  return shallow(
    <StarRating 
      name="name" 
      value={value} 
      max={max}
      editable={editable} 
      hover={hover} 
    />
  );
};

const mountStarRating = (value = 0, max = 5, editable = false, hover = false) => {
  return mount(
    <StarRating 
      name="name" 
      value={value} 
      max={max}
      editable={editable} 
      hover={hover} 
    />
  );
};

describe('<StarRating /> tests', () => {
  it('should return a function', () => {
    expect(typeof StarRating).toBe('function');
  });

  it('should render 5 radio input', () => {
    const wrapper = shallowStarRating(4.5);
    expect(wrapper.find('input[type="radio"]')).toHaveLength(5);
  });

  it('should render 5 star outlines', () => {
    const wrapper = shallowStarRating(0);
    expect(wrapper.find(IoIosStarOutline)).toHaveLength(5);
  });

  it('should render 3.5 stars for 7', () => {
    const wrapper = shallowStarRating(7, 10);
    expect(wrapper.find(IoIosStar)).toHaveLength(3);
    expect(wrapper.find(IoIosStarHalf)).toHaveLength(1);
    expect(wrapper.find(IoIosStarOutline)).toHaveLength(1);
  });

  it('should render 4 stars for 8', () => {
    const wrapper = shallowStarRating(8, 10);
    expect(wrapper.find(IoIosStar)).toHaveLength(4);
    expect(wrapper.find(IoIosStarOutline)).toHaveLength(1);
  });

  it('should render 3 stars for 3.25', () => {
    const wrapper = shallowStarRating(3.25);
    expect(wrapper.find(IoIosStar)).toHaveLength(3);
    expect(wrapper.find(IoIosStarOutline)).toHaveLength(2);
  });

  it('should render 4 stars for 4', () => {
    const wrapper = shallowStarRating(4);
    expect(wrapper.find(IoIosStar)).toHaveLength(4);
    expect(wrapper.find(IoIosStarOutline)).toHaveLength(1);
  });

  it('should render 4.5 stars for 9', () => {
    const wrapper = shallowStarRating(9, 10);
    expect(wrapper.find(IoIosStar)).toHaveLength(4);
    expect(wrapper.find(IoIosStarHalf)).toHaveLength(1);
  });

  it('should update stars when value changes', () => {
    const wrapper = mountStarRating(4);
    wrapper.setProps({ value: 3 });
    expect(wrapper.update().state().value).toBe(3);
  });

  it('should update state when hover', () => {
    const wrapper = mountStarRating(4, 5, true, true);
    wrapper.find('label').first().simulate('mouseenter');
    expect(wrapper.update().state().value).toBe(1);
  });

  it('should update state to the inital value when mouse leaves', () => {
    const wrapper = mountStarRating(4, 5, true, true);
    wrapper.find('label').first().simulate('mouseenter');
    wrapper.find('label').first().simulate('mouseleave');
    expect(wrapper.update().state().value).toBe(4);
  });

  it('should not update state when hover if hover is false', () => {
    const wrapper = mountStarRating(4, 5, true, false);
    wrapper.find('label').first().simulate('mouseenter');
    expect(wrapper.update().state().value).toBe(4);
  });

  it('should update state when click', () => {
    const wrapper = mountStarRating(4, 5, true, true);
    wrapper.find('input').first().simulate('change');
    expect(wrapper.update().state().value).toBe(1);
    expect(wrapper.update().state().origValue).toBe(1);
  });

  it('should not update state when click if editable is false', () => {
    const wrapper = mountStarRating(4);
    wrapper.find('input').first().simulate('change');
    expect(wrapper.update().state().value).toBe(4);
    expect(wrapper.update().state().origValue).toBe(4);
  });
});