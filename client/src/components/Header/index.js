import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container,
  Collapse, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';

import NavMenu from 'components/NavMenu/index';
import SearchBox from 'components/SearchBox/index';
import { navLinks } from 'constants/appConstants';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    
    return (
      <Container fluid styleName="header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/" title="Go to Cinematify">
            <div className="d-inline-block align-middle" styleName="logo"></div>
            <span styleName="logo-text">Cinematify</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} styleName="nav-toggler"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavMenu links={navLinks} />
            <SearchBox />
          </Collapse>
        </Navbar> 
      </Container>
    );
  }
}

export default Header;