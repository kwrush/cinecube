import { mount } from 'enzyme';
import React from 'react';
import ProgressiveImage from './ProgressiveImage';

const src = 'https://image.example/src';
const placeholder = 'https://image.example/placeholder';
const mountImage = () => {
  return mount(
    <ProgressiveImage 
      src={src}
      placeholder={placeholder}
    />
  );
};

describe('Progressive image tests', () => {
  it('create an instance of Image when mounted', () => {
    const wrapper = mountImage();
    const ins = wrapper.instance();
    expect(ins.loadingImage.constructor).toBe(HTMLImageElement);
  });

  it('should set onload and onerror on the Image instance', () => {
    const wrapper = mountImage();
    const ins = wrapper.instance();
    expect(ins.loadingImage.onload).toEqual(ins.onLoad);
    expect(ins.loadingImage.onerror).toEqual(ins.onError);
  });

  it('should sets src property on the Image instance', () => {
    const wrapper = mountImage();
    const ins = wrapper.instance();
    expect(ins.loadingImage.src).toEqual(src);
  });

  it('should render placeholder in the first render', () => {
    const wrapper = mountImage();
    const img = wrapper.find('img');
    expect(img.prop('src')).toEqual(placeholder);
  });

  it('should render src when it is loaded', () => {
    const wrapper = mountImage();
    wrapper.instance().loadImage();
    wrapper.instance().onLoad();
    const img = wrapper.update().find('img');
    expect(img.prop('src')).toEqual(src);
  });
});