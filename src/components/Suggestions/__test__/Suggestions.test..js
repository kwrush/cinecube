import React from 'react';
import { shallow } from 'enzyme';
import { ListGroup } from 'reactstrap';
import Suggestions from '../index';

describe('Test <Suggestions />', () => {
  
  it('should not render Suggestions menu when isOpen is false', () => {

    const autoComplete = shallow(<Suggestions />);
    expect(autoComplete.type()).toBe(null);
  });

  it('should show nonresult menu when isOpen is true but results is null or empty', () => {
    const autoComplete = shallow(<Suggestions isOpen={true} results={[]}/>);
    expect(autoComplete.instance().props['isOpen']).toBe(true);
    expect(autoComplete.contains(<div className="no-result" />));
  });


  it('should render the menu when provding the results', () => {
    const autoComplete = shallow(<Suggestions isOpen={true} />);

    const rs = [
      {
        type: 'movie',
        items: [
          {
            title: 'movie1', 
            'url': '/', 
            'imgUrl': '/'
          }
        ]
      },
      {
        type: 'tv',
        items: [
          {
            title: 'tv1', 
            'url': '/', 
            'imgUrl': '/'
          },
          {
            title: 'tv2', 
            'url': '/', 
            'imgUrl': '/'
          }
        ]
      }
    ];

    autoComplete.setProps({'results': rs});
    expect(autoComplete.find(ListGroup)).toHaveLength(2);
    expect(autoComplete.find(ListGroup).at(0).children()).toHaveLength(1);
    expect(autoComplete.find(ListGroup).at(1).children()).toHaveLength(2);

  });
});