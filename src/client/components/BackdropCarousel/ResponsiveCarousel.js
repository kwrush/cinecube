import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import BackdropCarousel from './BackdropCarousel';
import { Backdrop } from '../Backdrop';
import { mapToCssModules } from '../../utils/helpers';
import { chunk } from 'lodash';

class ResponsiveCarousel extends React.PureComponent {

  static propTypes = {
    mediaEntities: Backdrop.propTypes.mediaEntities,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntities: []
  }

  constructor (props) {
    super(props);
    this._itemPerSlice = 0;
    this._activeIndex = 0;
  }

  onActiveIndex = activeIndex => {
    if (activeIndex < 0 || activeIndex > this.props.mediaEntities.length) 
      return;

    this._activeIndex = activeIndex;
  }

  calculateInitialIndex = itemPerSlice => {
    if (itemPerSlice === this._itemPerSlice) return this._activeIndex;

    return itemPerSlice > this._itemPerSlice
      ? Math.floor(this._activeIndex / 2)
      : this._activeIndex * 2;
  }

  render () {
    const { mediaEntities, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);

    return (
      <MediaQuery maxWidth={767}>
        {
          match => {
            const itemPerSlice = match ? 2 : 4;
            const initialIndex = this.calculateInitialIndex(itemPerSlice);

            this._itemPerSlice = itemPerSlice;
            const entities = chunk(mediaEntities, this._itemPerSlice);

            return <BackdropCarousel
              className={classes}
              mediaEntities={entities}
              initialIndex={initialIndex}
              onActiveIndex={this.onActiveIndex}
            />
          }
        }
      </MediaQuery>
    );
  }
}

export default ResponsiveCarousel;
