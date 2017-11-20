import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

const propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  title: '',
  url: '/'
};

const SectionHeader = (props) => (
  <header styleName="section-header">
    <div className="d-flex justify-content-between">
      <span className="font-weight-bold">{props.title}</span>
      <a href={props.url} className="align-items-center text-uppercase" styleName="link-more">
        <span>More</span><MdKeyboardArrowRight />
      </a>
    </div>
  </header> 
);

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader