import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'reactstrap';
import Sidebar from './Sidebar';

describe('<Sidebar /> test', () => {
  it('should close sidebar initially', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.props().open).toBeFalsy();
  });

  it('should render children in a list', () => {
    const items = ['item1', 'item2', 'item3'].map((item, i) => (
      <div className="item" key={i}>{item}</div>
    ));
    const wrapper = mount(
      <Sidebar>
        {items}
      </Sidebar>
    );
    expect(wrapper.find('.item')).toHaveLength(3);
  });

  it('should add "modal-open" class to body when sidebar opens', () => {
    const wrapper = mount(<Sidebar />);
    wrapper.setProps({ open: true });
    jest.useFakeTimers();
    jest.runTimersToTime(300);
    expect(document.body.className).toContain('modal-open');
  });

  it('should call onClick when clicks button', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Sidebar open onToggle={onClick} />);
    wrapper.instance()._animate = false;
    wrapper.find('button.close-btn').simulate('click');
    expect(onClick).toBeCalled();
  }); 

  it('should call onClick when clicks backdrop', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Sidebar open onToggle={onClick} />);
    wrapper.instance()._animate = false;
    wrapper.find('div.sidebar-backdrop').simulate('click');
    expect(onClick).toBeCalled();
  }); 

  it('should render headerContent directly', () => {
    const wrapper = mount(
      <Sidebar headerContent={<div className="sb-header"></div>}/>
    );

    expect(wrapper.find(".sb-header")).toHaveLength(1);
  });

  it('should pass open property to headerContent function', () => {
    const wrapper = mount(
      <Sidebar open headerContent={
        open => open 
          ? <div className="sb-open"></div>
          : <div className="sb-close"></div>
      }/>
    );

    expect(wrapper.find('.sb-open')).toHaveLength(1);
    expect(wrapper.find('.sb-close')).toHaveLength(0);

    wrapper.setProps({ open: false });

    expect(wrapper.find('.sb-open')).toHaveLength(0);
    expect(wrapper.find('.sb-close')).toHaveLength(1);
  });
});