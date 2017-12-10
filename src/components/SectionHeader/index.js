import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  title: '',
  url: '/'
};

const SectionHeader = (props) => {
  
  const { title, url, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);
  
  return (
    <header styleName="section-header" className={classes}>
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold">{title}</span>
        <a href={url} className="align-self-center text-uppercase" styleName="link-more">
          <span>More</span><MdKeyboardArrowRight />
        </a>
      </div>
    </header> 
  );
};

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader;