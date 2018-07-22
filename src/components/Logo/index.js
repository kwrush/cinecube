import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.scss';

// helper makes svg path of arc
const makeArc = (radius, angle, width, flipY, solid) => {

  const arc = {};

  // viewbox is 100, 100
  const vw = 100;
  const vh = 100;

  // x, y offset from arc center to the start point 
  let dx = radius * Math.sin(angle * Math.PI / 180);
  let dy = radius * Math.cos(angle * Math.PI / 180);
  let sweep = '0 1 0';

  if (flipY) {
    dy = -dy;
    sweep = '0 1 1';
  }

  // start point
  const startX = vw / 2 + dx;
  const startY = vh / 2 - dy;

  // end point
  const endX = startX;
  const endY = vh / 2 + dy;

  arc.M = `${startX} ${startY}`;
  arc.A = [`${radius} ${radius} ${sweep} ${endX} ${endY}`];
  arc.L = [`${endX} ${endY}`];

  // make inner contour
  if (!solid) {
    const inner = makeArc(radius - width, angle, width, true, true);
    arc.L[0] = inner.M;
    arc.A.push(inner.A);
    arc.L.push(inner.L);
  }

  return arc;
};

const propTypes = {
  size: PropTypes.number,
  units: PropTypes.string,
  color: PropTypes.string,
  hoverAnimation: PropTypes.bool
};

const defaultProps = {
  size: 4,
  units: 'rem',
  color: '#FFFFFF',
  hoverAnimation: true
};

const Logo = props => {

  const logoClasses = classNames('logo', {'hover-logo': props.hoverAnimation});
  
  const logoStyles = {
    width: `${props.size}${props.units}`,
    height: `${props.size}${props.units}`,    
  };

  const outer = makeArc(36, 45, 6, false, false);
  const inner = makeArc(18, 45, 6, false, false);

  const fillOuter = makeArc(33, 45, 6, false, true);
  const fillInner = makeArc(15, 45, 6, false, true);

  return (

    <div styleName={logoClasses} style={logoStyles}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <g fill="none" stroke={`${props.color}`}>
          <path styleName="border" d="M 98 2, 2 2, 2 98" /> 
          <path styleName="border" d="M 2 98, 98 98 98 2"  /> 
          <path styleName="fill fill-outer" d={`
            M ${fillOuter.M} 
            A ${fillOuter.A[0]}`} />
          <path styleName="fill fill-inner" d={`
            M ${fillInner.M} 
            A ${fillInner.A[0]}`} />
          <path styleName="outer" d={`
            M ${outer.M} 
            A ${outer.A[0]}
            L ${outer.L[0]}
            A ${outer.A[1]}
            L ${outer.L[1]}
            Z`} />
          <path styleName="inner" d={`
            M ${inner.M} 
            A ${inner.A[0]}
            L ${inner.L[0]}
            A ${inner.A[1]}
            L ${inner.L[1]}
            Z`} />
        </g>
      </svg>
    </div>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;