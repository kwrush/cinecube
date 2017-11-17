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

import logo from 'images/logo.png';

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
    
    const imgStyle = {
      width: '40px',
      height: '35px'
    };
    
    return (
      <Container fluid styleName="header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/" title="Home">
            <img 
              src={logo} 
              alt="logo" 
              className="d-inline-block align-middle" 
              style={imgStyle}
            />
            <span styleName="logo-text">Cinematify</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} styleName="nav-toggler"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavMenu links={navLinks} className="ml-auto"/>
            <SearchBox />
          </Collapse>
        </Navbar> 
      </Container>
    );
  }
}

export default Header;