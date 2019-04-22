import React from 'react';
import PropTypes from 'prop-types';
import {
  Transition,
  Trail,
  Spring,
  animated
} from 'react-spring/renderprops';
import { 
  Nav,
  Button
} from 'reactstrap';
import { IoMdClose } from 'react-icons/io';
import { mapToCssModules } from '../../utils/helpers';
import './Sidebar.scss';


class Sidebar extends React.PureComponent {

  static propTypes = {
    open: PropTypes.bool,
    onToggle: PropTypes.func,
    headerContent: PropTypes.oneOfType(
      PropTypes.func,
      PropTypes.node
    ),
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    open: false,
    headerContent: undefined,
    onToggle: () => {},
  }

  componentDidMount () {
    this._isMounted = true;
    this._animated = false;
  }

  componentWillUnmount () {
    const bodyModal = mapToCssModules('modal-open', this.props.cssModule);
    document.body.className.remove(bodyModal);
    this._isMounted = false;
    this._animate = false;
  }

  componentDidUpdate () {
    // prevent scorlling window when sidebar opens
    const bodyModal = mapToCssModules('modal-open', this.props.cssModule);
    this.props.open 
      ? document.body.classList.add(bodyModal)
      : document.body.classList.remove(bodyModal);
  }

  onToggleSideBar = e => {
    e && e.preventDefault();
    !this._animate && this.props.onToggle();
  }

  onItemClick = e => {
    e && e.preventDefault();
    this.props.onToggle();
  }

  onAnimationStart = () => {
    this._animate = true;
  }

  onAnimationRest = () => {
    this._animate = false;
  }

  renderBackdrop = () => {
    const { open } = this.props;

    return (
      <Transition
        native
        items={open}
        from={{ opacity: 0 }}
        enter={{ opacity: 0.5 }}
        leave={{ opacity: 0 }}
      >
        { 
          open => open && (props => (
            <animated.div
              styleName="sidebar-backdrop"
              style={props} 
              onClick={this.onToggleSideBar}
            > </animated.div>
          ))
        }
      </Transition>
    );
  }

  renderContent = () => {
    const { open, children } = this.props;

    return (
      <Nav vertical>
        <Trail
          native
          delay={200}
          items={children}
          keys={item => item.key}
          reverse={!open}
          from={{
            opacity: open ? 0 : 1,
            x: open ? -20 : 0
          }}
          to={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -20
          }}
        >
          {
            item => ({ x, opacity }) => (
              <animated.li
                style={{
                  opacity,
                  transform: x.interpolate(x => `translateX(${x}%)`)
                }}
                onClick={this.onItemClick}
              >
                {item}
              </animated.li>
            )
          }
        </Trail>
      </Nav>
    );
  }

  render () {
    const { open, className, cssModule, headerContent } = this.props;
    const classes = mapToCssModules(className, cssModule);

    return (
      <div styleName="sidebar-wrapper">
        {this.renderBackdrop(open)}
        <Spring
          native
          immediate={!this._isMounted}
          from={{ x: open ? -100 : 0 }}
          to={{ x: open ? 0 : -100 }}
          onStart={this.onAnimationStart}
          onRest={this.onAnimationRest}
        >
          {
            ({ x }) => (
              <animated.div
                styleName="sidebar"
                className={classes}
                style={{
                  transform: x.interpolate(x => `translateX(${x}%)`)
                }}
              >
                <div styleName="sidebar-header">
                  { 
                    headerContent && typeof headerContent === 'function' 
                      ? headerContent(open) 
                      : headerContent
                  }
                </div>
                {this.renderContent()}
                <Button
                  styleName="close-btn override"
                  onClick={this.onItemClick}
                >
                  <IoMdClose />
                </Button>
              </animated.div>
            )
          }
        </Spring>
      </div>
    );
  }
}

export default Sidebar;