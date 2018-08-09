import React from 'react';
import PropTypes from 'prop-types';
import { CarouselItem, Util } from 'reactstrap';
import BackdropPoster from '../BackdropPoster';
import BackdropInfo from '../BackdropInfo';
import './style.scss';

class Backdrop extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    backdropUrl: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    genreIds: PropTypes.array,
    releaseDate: PropTypes.string,
    active: PropTypes.bool,
    onAllEntered: PropTypes.func,
    onEntering: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    rating: 0,
    genreIds: [],
    releasedDate: '',
    active: false,
    onEntering: () => {},
    onAllEntered: () => {}
  }

  constructor (props) {
    super(props);

    this.state = {
      showPoster: false,
      showBackdropInfo: false
    };
  }

  showPoster = () => {
    this.setState({
      showPoster: true
    });
  }

  showBackdropInfo = () => {
    this.setState({
      showBackdropInfo: true
    });
  }

  handleExited = () => {
    this.setState({
      showPoster: false,
      showBackdropInfo: false
    });
  }

  renderPoster = () => {

    const { posterUrl, title } = this.props;
    const { showPoster } = this.state;

    return (
      <BackdropPoster
        styleName="poster-info"
        posterUrl={posterUrl}
        title={title}
        active={showPoster}
        onEntered={this.showBackdropInfo}
      />
    );
  } 

  renderInfo = () => {

    const { id, mediaType, title, releaseDate, genreIds, rating, onAllEntered } = this.props;
    const { showBackdropInfo } = this.state;

    return (
      <BackdropInfo 
        id={id}
        mediaType={mediaType}
        title={title}
        releaseDate={releaseDate}
        genresIds={genreIds}
        rating={rating}
        active={showBackdropInfo}
        onEntered={onAllEntered}
      />
    );
  }

  render() {

    const { backdropUrl, active, className, cssModule, onEntering } = this.props;

    const classes = Util.mapToCssModules(className, cssModule);

    return (
      <CarouselItem 
        className={classes}
        in={active}
        appear={true}
        onEntering={onEntering}
        onEntered={this.showPoster}
        onExited={this.handleExited}
      >
        <div styleName="backdrop-view">
          <div styleName="backdrop">
            <img src={backdropUrl} alt=""/>
          </div>
          <div styleName="backdrop-group">
            { this.renderPoster() }
            { this.renderInfo() }
          </div>
        </div>
      </CarouselItem>
    );
  }
}

export default Backdrop;