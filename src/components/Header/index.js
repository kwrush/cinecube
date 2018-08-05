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
import {
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES
} from '../../constants/routes';
import HeaderNav from '../HeaderNav';
import SearchBox from '../SearchBox';
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
      isNavOpen: false,
      results: []
    };
  }

  toggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render () {

    const { className, cssModule } = this.props;

    const classes = Util.mapToCssModules(className, cssModule);
    const navItems = [MOVIE_ROUTES, TV_ROUTES, PEOPLE_ROUTES]
      .map(routes => ({ url: routes.home, name: routes.name }));

    return (
      <header styleName="header" className={classes}>
        <Container>
          <Navbar expand="md" className="mr-auto" dark>
            <NavbarBrand href="/" styleName="nav-logo">
              <Logo size="2.5rem" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <HeaderNav 
                navItems={navItems}
                styleName="header-nav"
              />
              <SearchBox 
                styleName="searchbox" 
                searchResults={this.state.results}
              />
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

export default Header;