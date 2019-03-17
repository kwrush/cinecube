import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalBody,
  ModalFooter,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageUtils';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';
import CircleRating from '../CircleRating';
import { mapToCssModules } from '../../utils/helpers';

class MediaCard extends React.PureComponent {
  static propTypes = {
    mediaEntity: PropTypes.shape({
      id: PropTypes.number.isRequired,
      mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
      backdropPath: PropTypes.string.isRequired,
      posterPath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      voteAverage: PropTypes.number.isRequired,
      genreIds: PropTypes.array.isRequired,
      overview: PropTypes.string.isRequired,
      videoId: PropTypes.string
    }),
    clasName: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntity: null
  }

  onPlayerReady = e => {
    
  }

  renderVideoPlayer = (entity) => {
    const { mediaType, id, videoId } = entity;
    return (
      <div>
        <YouTube 
          id={`${mediaType}_${id}`}
          videoId={videoId}
          onReady={this.onPlayerReady}
        />
      </div>
    );
  }

  renderMediaContent = (entity) => {

    if (!entity) return;

    const { 
      backdropPath, 
      posterPath, 
      title, 
      voteAverage, 
      genreIds, 
      overview 
    } = entity;
    
    const posterPreview = getPosterUrl(posterPath, 'xs');
    const poster = getPosterUrl(posterPath, 'm');
    const backdrop = getBackdropUrl(backdropPath, 'm');

    return (
      <Media>
        <Media left>
          <ProgressiveImage 
            src={poster}
            placeholder={posterPreview}
            alt={title}
          />
        </Media>
        <Media body>
          <div></div>
          <Media heading>
            { title }
          </Media>
          <CircleRating value={voteAverage} />
          <p>{ overview }</p>
        </Media>
      </Media>
    );
  }

  render () {
    const { mediaEntity, className, cssModule } = this.props;

    if (!mediaEntity) return;

    const { id, mediaType } = mediaEntity;
    const classes = mapToCssModules(className, cssModule);

    return (
      <div className={classes}>
        { this.renderVideoPlayer(mediaEntity) }
        <ModalBody>
          { this.renderMediaContent(mediaEntity) }
        </ModalBody>
        <ModalFooter>
          <Link to={`/${mediaType}/${id}`}>View More</Link>
        </ModalFooter>
      </div>
    );
  }
}

export default MediaCard;