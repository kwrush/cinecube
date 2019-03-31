import React from 'react';
import PropTypes from 'prop-types';
import { ProgressiveImage } from '../ProgressiveImage';
import YouTube from 'react-youtube';
import { debounce } from 'lodash';
import { mapToCssModules } from '../../utils/helpers';
import { getBackdropUrl } from '../../utils/imageUtils';
import './VideoBackdrop.scss';

class VideoBackdrop extends React.PureComponent {
  static propTypes = {
    videoId: PropTypes.string,
    thumbnailId: PropTypes.string,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    videoId: null,
    thumbnailId: null
  }

  constructor (props) {
    super(props);
    this.state = {
      ytPlayer: null,
      containerWidth: null,
      containerHeight: null
    }

    this._containerRef = React.createRef();
  }

  componentDidUpdate (prevProps, prevState) {
    const { ytPlayer } = prevState;
  }

  updateContainerSize = e => {
    if (!this._containerRef || !this.props.showVideo) return;

    const w = this._containerRef.current.clientWidth;
    const h = this._containerRef.current.clientHeight;

    this.setState({
      width: w,
      height: h
    });
  }

  onVideoReady = e => {
    this.setState({
      ytPlayer: e.target
    });
  }

  renderThumbnail = imgId => {
    if (!imgId) return;

    const imgURL = getBackdropUrl(imgId, 'm');
    const preview = getBackdropUrl(imgId, 's');
    console.log('######', imgURL);
    return <ProgressiveImage src={imgURL} placeholder={preview}/>;
  }

  renderPlayer = videoId => {
    if (!videoId) return;

    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        start: 40,
        end: 80,
        autoplay: 1,
        controls: 0,
        cc_load_policy: 0,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        disablekb: 1,
        rel: 0,
        mute: 1,
        loop: 1,
        playlist: videoId
      }
    };

    return (
      <YouTube 
        styleName="player"
        videoId={videoId}
        opts={opts}
        onReady={this.onVideoReady}
      />
    );
  }

  render () {
    const { 
      videoId, 
      thumbnailId, 
      className,
      cssModule 
    } = this.props;
    const { ytPlayer } = this.state; 

    const classes = mapToCssModules(className, cssModule);

    return (
      <div 
        ref={this._containerRef}
        className={classes}
        styleName="video-container"
      >
        { this.renderPlayer(videoId) }
        { !ytPlayer && this.renderThumbnail(thumbnailId) } 
      </div>
    );
  }
}

export default VideoBackdrop;