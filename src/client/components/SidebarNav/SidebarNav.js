import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import cx from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import styles from './SidebarNav.scss';


class SidebarNav extends React.PureComponent {

  static propTypes = {
    show: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.string
    ),
    onClose: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    show: false,
    items: [],
    onClose: null
  }

  closeSidebar = e => {
    e.stopPropagation();
    this.props.onClose();
  }

  renderNavItems = items => {
    return items.map((item, i) => (
      <NavItem
        key={`nav_item_${i}`}
      >
        <NavLink
          to={`/${item.toLowerCase()}`}
          styleName="nav-item-link"
          activeClassName={styles.active}
        >
          {item.toUpperCase()}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    const { show, items, onClose, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);
    const sidebarClasses = cx('sidebar', { show: show });
    const backdropClasses = cx('sidebar-backdrop', { show: show });

    return (
      <div styleName="sidebar-wrapper">
        <div styleName={backdropClasses}></div>
        <div
          styleName={sidebarClasses}
          className={classes}
        >
          <Nav vertical>
            {this.renderNavItems(items)}
          </Nav>
          {
            onClose && (
              <Button
                close
                styleName="close-btn override"
                onClick={this.closeSidebar}
              >
                <MdClose />
              </Button>
            )
          }
        </div>
      </div>
    );
  }
}
  
export default SidebarNav;
