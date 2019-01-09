import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import { RootRef } from '../RootRef';
import shouldToggleOrScrollHeader from './shouldToggleOrScrollHeader';
import './StickyHeader.scss';

class StickyHeader extends React.PureComponent {

  static propTypes = {
    cssModule: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.element
  }

  constructor(props) {
    super(props);

    this.lastKnownScrollY = 0;
    this.currentScrollY = 0;
    this.scrollTicking = false;
    this.resizeTicking = false;

    this.headerRef = React.createRef();

    this.state = {
      status: 'unfixed',
    };
  }

  componentDidMount () {
    this.setWrapperHeight();
    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowResize);
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    // This is needed because we have to add transition 
    // after status changed from "unfixed" to "unpinned"
    // to avoid transition of negative translateY
    this.initialUnpin = 
      nextState.status === 'unpinned' 
      && this.state.status === 'unfixed';
  }

  setWrapperHeight = () => {
    this.headerRef && this.setState({
      wrapperHeight: this.headerRef.current.offsetHeight
    });

    this.resizeTicking = false;
  }

  onWindowScroll = (e) => {
    this.currentScrollY = window.pageYOffset;
    this.requestScrollTick();
  }

  onWindowResize = (e) => {
    this.requestResizeTick();
  }

  requestScrollTick = () => {
    if (!this.scrollTicking) {
      raf(this.update);
    }

    this.scrollTicking = true;
  }

  requestResizeTick = () => {
    if (!this.resizeTicking) {
      raf(this.setWrapperHeight);
    }

    this.resizeTicking = true;
  }

  shouldChangeStatus = () => {
    return shouldToggleOrScrollHeader(this.state, this.lastKnownScrollY, this.currentScrollY);
  }

  update = () => {

    const change = this.shouldChangeStatus();

    if (change === 'unfix') {
      this.unfix();
    } else if (change === 'pin') {
      this.pin();
    } else if (change === 'unpin') {
      this.unpin();
    }

    this.lastKnownScrollY = this.currentScrollY;
    this.scrollTicking = false;
  }

  unfix = () =>  {
    this.setState({
      status: 'unfixed'
    });
  }

  pin = () => {
    this.setState({
      status: 'pinned'
    });
  }

  unpin = () => {
    this.setState({
      status: 'unpinned'
    });
  }

  render() {

    const { className, cssModule, children } = this.props;

    const { status, wrapperHeight } = this.state;
    const pinned = status === 'pinned';
    const unfixed = status === 'unfixed';
    const unpinned = status === 'unpinned';

    // Transition is not applied when state changes from "unfixed" to "unpinned"
    const styleClasses = classNames('innerWrapper', { pinned, unpinned, unfixed }, { 'transitionHeader': !this.initialUnpin });
    const innerClasses = mapToCssModules(className, cssModule);

    const wrapperStyle = {
      height: wrapperHeight ? wrapperHeight : null,
      background: 'none'
    };

    return (
      <div style={wrapperStyle}>
        <div style={wrapperStyle} styleName={styleClasses} className={innerClasses}>
          <RootRef rootRef={this.headerRef}>
              {children}
          </RootRef>
        </div>
      </div>
    );
  }
}

export default StickyHeader;