import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse
} from 'reactstrap';
import Logo from '../Logo/Logo';
import { SearchInput } from '../SearchInput';
import Headroom from 'react-headroom';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './Header.scss';

class Header extends React.PureComponent {

  static propTypes = {
    onSearchPending: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      collapse: true
    };
  }

  toggleSearchInput = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const { onSearchPending, className, cssModule } = this.props;
    const { collapse } = this.state;
    const classes = mapToCssModules(className, cssModule);
    const togglerStyles = classNames('toggler', { open: !collapse });

    return (
      <Headroom downTolerance={3}>
        <Navbar
          light
          color="light"
          expand="md"
          className={classes}
        >
          <NavbarBrand>
            <Logo size="2.25rem" />
          </NavbarBrand>
          <NavbarToggler
            styleName={togglerStyles}
            onClick={this.toggleSearchInput} 
          />
          <Collapse 
            isOpen={!collapse} 
            navbar
          >
            <Nav navbar className="ml-auto">
              <NavItem styleName="padding-top">
                <SearchInput
                  onSearchPending={onSearchPending}
                />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Headroom>
    );
  }
}

export default Header;