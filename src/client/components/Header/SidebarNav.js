import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { SidebarContext} from '../Header';
import { MediaQuery } from '../MediaQuery';
import { mapToCssModules } from '../../utils/helpers';
import styles from './SidebarNav.scss';
import SearchBar from './SearchBar';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.string
  ),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  items: []
};

const SidebarNav = props => {
  const { items, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  const navItems = items.map((item, i) => (
    <NavLink
      key={`nav_item_${i}`}
      to={`/${item.toLowerCase()}`}
      styleName="nav-item-link"
      activeClassName={styles.active}
    >
      {item.toUpperCase()}
    </NavLink>
  ));

  return (
    <SidebarContext.Consumer>
      {
        ({ openSidebar, onToggleSidebar }) => (
          <Sidebar
            className={classes}
            open={openSidebar}
            onToggle={onToggleSidebar}
            headerContent={
              open => (
                <MediaQuery.Xs>
                  <SearchBar 
                    styleName="sidebar-search"
                    clearValue={open} 
                  />
                </MediaQuery.Xs>
              )
            }
          >
            {navItems}
          </Sidebar>
        )
      }
    </SidebarContext.Consumer>
  );
};

SidebarNav.propTypes = propTypes;
SidebarNav.defaultProps = defaultProps;
  
export default SidebarNav;