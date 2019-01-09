import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { mapToCssModules } from '../../utils/helpers';
import './NavbarButton.scss';

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: null
};

function NavbarButton (props) {

  const { onClick, className, children, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <Button 
      styleName="navbar-button" 
      className={classes}
      onClick={onClick}
    >
      { children }
    </Button>
  );
}

NavbarButton.propTypes = propTypes;
NavbarButton.defaultProps = defaultProps;

export default NavbarButton;