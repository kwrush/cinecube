import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Navbar, NavbarBrand } from 'reactstrap';
import { StickyHeader } from '../StickyHeader';
import { Logo } from '../Logo';
import { HeaderNav } from '../HeaderNav';
import { mapToCssModules } from '../../utils/helpers';
import { FullModal } from '../FullModal';
import { SearchInput } from '../SearchInput';
import { MdSearch, MdMenu } from 'react-icons/md';
import { NavbarButton } from '../NavbarButton';
import './AppHeader.scss';


class AppHeader extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      showNavMenu: false,
      showSearchInput: false
    }
  }

  toggleNavMenu = () => {
    this.setState({
      showNavMenu: !this.state.showNavMenu
    });
  }

  toggleSearchInput = () => {
    this.setState({
      showSearchInput: !this.state.showSearchInput
    })
  }

  closeNavMenuOnEixt = () => {
    // avoid opening full screen menu on remount
    this.setState({
      showNavMenu: false
    })
  }

  renderHeaderNav = () => {
    return (
      <div>
        <MediaQuery minWidth={769}>
          <HeaderNav onLinkClick={this.toggleNavMenu} />
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <FullModal 
            open={this.state.showNavMenu} 
            toggle={this.toggleNavMenu}
            onExit={this.closeNavMenuOnEixt}
          >
            <HeaderNav onLinkClick={this.toggleNavMenu} />
          </FullModal>
        </MediaQuery>
      </div>
    );
  }

  render() {

    const { className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);

    const iconSize = '1.75rem';

    return (
      <StickyHeader>
        <Navbar
          styleName="navbar ovrd"
          className={classes}
          color="light"
          light
          expand="md"
        >
          <NavbarButton 
            styleName="menu-button navbar-btn" 
            onClick={this.toggleNavMenu}
          >
            <MdMenu size={iconSize} />
          </NavbarButton>
          <NavbarBrand
            href="/"
            styleName="nav-brand"
          >
            <Logo size="2.25rem" />
          </NavbarBrand>
          {this.renderHeaderNav()}
          <NavbarButton
            styleName="navbar-btn"
            onClick={this.toggleSearchInput}
          >
            <MdSearch size={iconSize} />
          </NavbarButton>
        </Navbar>
        <FullModal 
          fade={false}
          open={this.state.showSearchInput} 
          toggle={this.toggleSearchInput}
        >
          <SearchInput />
        </FullModal>
      </StickyHeader>
    );
  }

}

export default AppHeader;