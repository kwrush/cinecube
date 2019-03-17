import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Util } from 'reactstrap';
import { Poster } from '../Poster'
import { getPosterUrl } from '../../utils/imageUtils';
import './style.scss'

const propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  active: PropTypes.bool,
  onEntered: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  posterUrl: '',
  title: '',
  active: false,
  onEntered: () => {}
};

const posterStyle
 = {
  opacity: 0, 
  transform: 'translateY(-2rem)'
};

const enterStyle = {
  opacity: 1,
  transform: 'translateY(0)',
  transition: 'transform 0.6s, opacity 0.3s ease-in-out'
};

const transitionStyles = {
  entering: { ...enterStyle },
  entered: { ...enterStyle },
}

const BackdropPoster = (props) => {

  const { active, posterUrl, title, cssModule, className, onEntered } = props;

  const classes = Util.mapToCssModules(className, cssModule);

  return (
    <Transition
      in={active}
      timeout={600}
      appear={true}
      onEntered={onEntered}
      exit={false}
    >
      {
        (state) => (
          <div
            className={classes}
            style={{
              ...posterStyle,
              ...transitionStyles[state]
            }}
          >
            <Poster
              styleName="card"
              imageURL={posterUrl}
              previewURL={posterUrl}
              title={title}
            />
          </div>
        )
      }
    </Transition>
  );
};

BackdropPoster.propTypes = propTypes;
BackdropPoster.defaultProps = defaultProps;

export default BackdropPoster;
