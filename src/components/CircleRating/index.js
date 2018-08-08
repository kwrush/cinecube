import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Util } from 'reactstrap';
import './style.scss';

const propTypes = {
  active: PropTypes.bool,
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  delay: PropTypes.number
};

const defaultProps = {
  active: true,
  value: 0,
  max: 10,
  delay: 0
};

const CircleRating = props => {
  const { active, value, max, delay, className, cssModule } = props;

  const size = 100;
  const skWidth = 10;
  const ratio = value / max;
  const radius = (size - skWidth * 2) / 2;
  const origin = {
    cx: size / 2,
    cy: size / 2
  };

  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * ratio;

  const classes = Util.mapToCssModules(className, cssModule);

  const ratingStyle = { strokeDasharray: dashArray };

  const transitionStyle = {
    entering: { strokeDashoffset: Math.floor(dashArray) },
    entered:  { strokeDashoffset: dashOffset },
    exiting:  { strokeDashoffset: dashOffset },
    exited:   { strokeDashoffset: dashOffset }
  };

  return (
    <div styleName="rating" className={classes}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <circle
          styleName="circle-background"
          {...origin}
          r={size / 2}
          strokeWidth={`${skWidth}px`}
        />
        <circle
          styleName="circle-border"
          {...origin}
          r={radius}
          strokeWidth={`${skWidth}px`}
        />
        <Transition
          in={active}
          appear={active}
          timeout={100 + delay}
          unmountOnExit
        >
          {
            status => (
              <circle
                styleName="circle-rating"
                {...origin}
                r={radius}
                strokeWidth={`${skWidth}px`}
                transform={`rotate(-90, ${origin.cx} ${origin.cy})`}
                style={{
                  ...ratingStyle,
                  ...transitionStyle[status]
                }}
              />
            )
          }
        </Transition>
        <text
          styleName="circle-text"
          x="50%"
          y="50%"
          textAnchor="middle"
          style={{ fontSize: `${0.8 * radius}px` }}
        >
          {`${value}`}
        </text>
      </svg>
    </div>

  );
}

CircleRating.propTypes = propTypes;
CircleRating.defaultProps = defaultProps;

export default CircleRating;