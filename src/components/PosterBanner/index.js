import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Util } from 'reactstrap';
import PosterBox from '../PosterBox';
import './style.scss';

const propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  requestLink: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  title: '',
  item: [],
  requestLink: '#'
};

const PosterBanner = (props) => {
  const { title, items, requestLink, className, cssModule } = props;
  const classes = Util.mapToCssModules(className, cssModule);

  return (
    <div styleName="poster-banner" className={classes}>
      <header styleName="poster-banner-header">
        <h3 styleName="banner-title">{title}</h3>
        <Link to={requestLink} styleName="request-link">More</Link>
      </header>
      <Row>
        {
          items.map((item, index) => {

            const { title, posterUrl, id, mediaType } = item;

            return (
              <Col 
                styleName="poster-entity"
                key={id} 
                xs="12" 
                sm="6" 
                md="4" 
                lg="3" xl={`${12 / items.length}`}
              >
                <PosterBox 
                  title={title} 
                  posterUrl={posterUrl}
                  linkUrl={`/${mediaType}/${id}`}
                />
              </Col>
            );
          })
        }
      </Row>
    </div>
  );
}

PosterBanner.propTypes = propTypes;
PosterBanner.defaultProps = defaultProps;

export default PosterBanner;