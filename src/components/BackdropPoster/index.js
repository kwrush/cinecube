import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Util } from 'reactstrap';
import Poster from '../Poster'
import style from './style.scss'

const propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  posterUrl: '',
  title: ''
};

const BackdropPoster = (props) => {

  const { active, posterUrl, title, cssModule, className } = props;

  const backdropClasses = {
    enter: style['poster-enter'],
    enterActive: style['poster-enter-active'],
    enterDone: style['poster-enter-done'],
    exitActive: style['poster-exit-active']
  };

  const classes = Util.mapToCssModules(className, cssModule);

  return (
    <CSSTransition
      in={active}
      timeout={300}
      classNames={backdropClasses}
      { ...props }
      unmountOnExit
    >
      <Poster 
        className={classes}
        imageUrl={posterUrl} 
        title={title} 
      />
    </CSSTransition>
  );
};

BackdropPoster.propTypes = propTypes;
BackdropPoster.defaultProps = defaultProps;

export default BackdropPoster;
