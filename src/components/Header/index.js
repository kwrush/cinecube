import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules } from 'utils/helpers';
import { 
  Container,
  Collapse, 
  Navbar, 
  NavbarToggler
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import NavMenu from 'components/NavMenu/index';
import SearchBox from 'components/SearchBox/index';
import { navLinks } from 'constants/appConstants';

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
};

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
    const { className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);

    return (
      <Container fluid className={classes} styleName="header">
        <Navbar color="faded" light expand="md" styleName="navbar">
          <NavLink to="/" styleName="brand" className="d-flex align-items-center" title="Home">
            <div styleName="logo" className="d-inline-block"></div>
          </NavLink>
          <NavbarToggler onClick={this.toggle} styleName="nav-toggler"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavMenu links={navLinks} />
            <SearchBox styleName="searchbox"/>
          </Collapse>
        </Navbar> 
      </Container>
    );
  }
}

Header.propTypes = propTypes;

export default Header;