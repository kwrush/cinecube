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

  it('should call onClose when clicks button', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Sidebar onToggle={onClick} />);
    wrapper.find(Button).simulate('click');
    expect(onClick).toBeCalled();
  }); 
});