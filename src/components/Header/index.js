import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
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
      <div styleName="header" className={classes}>
        <Navbar expand="md" className="mr-auto">
          <NavbarBrand href="/">
            <Logo size={2.5} />
          </NavbarBrand>
          <NavbarToggler onClick={ this.toggle } />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <HeaderNav styleName="header-nav" />
            <SearchBox className="ml-auto" />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;