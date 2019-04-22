import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { mapToCssModules } from '../../utils/helpers';

const propTypes = {
  onToggle: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  onToggle: () => {}
};

const Toggler = props => {
  const { onToggle, children, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <Button
      className={classes}
      onClick={onToggle}
    >
      { children }
    </Button>
  );
};

Toggler.propTypes = propTypes;
Toggler.defaultProps = defaultProps;

export default Toggler;