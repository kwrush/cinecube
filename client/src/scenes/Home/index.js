import './style.scss';

import React from 'react'
import { CardGroup, Container, Navbar, NavbarBrand, Button } from 'reactstrap';

import ShowGroup from 'components/ShowGroup/index';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div styleName="home-container">
        <ShowGroup 
          title="Movies"
        />
        <ShowGroup 
          title="TVs"
        />
      </div>
    );
  }
}

export default Home