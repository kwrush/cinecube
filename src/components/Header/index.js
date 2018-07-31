import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Container,
  Util
} from 'reactstrap';

import HeaderNav from '../HeaderNav/index';
import SearchBox from '../SearchBox/index';
import Logo from '../Logo';
import './style.scss';

class Header extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {}

  constructor (props) {
    super(props);

    this.state = {
      isNavOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render () {
    let classes = Util.mapToCssModules(this.props.className, this.props.cssModule);

    return (
      <header styleName="header" className={classes}>
        <Container>
          <Navbar expand="md" className="mr-auto">
            <NavbarBrand href="/">
              <Logo size={2.5} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <HeaderNav styleName="header-nav" />
              <SearchBox styleName="searchbox" />
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

export default Header;