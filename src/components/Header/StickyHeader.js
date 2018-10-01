import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import classNames from 'classnames';
import { blue, grey } from '@material-ui/core/colors';
import Header from './Header';
import './StickyHeader.scss';
import { withStyles } from '@material-ui/core';
import { mapToCssModules } from '../../utils/helpers';
import shouldToggleOrScrollHeader from './shouldToggleOrScrollHeader';

const styles = theme => ({
  root: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
    minHeight: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 48,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 64,
    }
  }
});

class StickyHeader extends React.PureComponent {

  static propTypes = {
    cssModule: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    titleColor: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    titleColor: blue[500],
    color: grey[200]
  }

  constructor(props) {
    super(props);

    this.lastKnownScrollY = 0;
    this.currentScrollY = 0;
    this.scrollTicking = false;
    this.resizeTicking = false;

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
    // to avoid animation of negative translateY
    this.initialUnpin = 
      nextState.status === 'unpinned' 
      && this.state.status === 'unfixed';
  }
  
  setRef = ref => 
    this.headerRef = ref;

  setWrapperHeight = () => {
    this.headerRef && this.setState({
      wrapperHeight: this.headerRef.offsetHeight
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

    const { classes, className, cssModule, children, ...rest } = this.props;

    const { status } = this.state;
    const pinned = status === 'pinned';
    const unfixed = status === 'unfixed';
    const unpinned = status === 'unpinned';

    // Transition is not applied when state changes from "unfixed" to "unpinned"
    const styleClasses = classNames({ pinned }, { unpinned }, { unfixed }, { 'transitionHeader': !this.initialUnpin });
    const rootClasses = classNames(classes.root,  mapToCssModules(className, cssModule));

    return (
      <div className={classes.root}>
        <div styleName={styleClasses} className={rootClasses} ref={this.setRef}>
          <Header position="absolute" {...rest}>
            {children}
          </Header>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StickyHeader);