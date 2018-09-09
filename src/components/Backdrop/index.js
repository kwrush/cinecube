import React from 'react';
import PropTypes from 'prop-types';
import { CarouselItem, Util } from 'reactstrap';
import classNames from 'classnames';
import BackdropPoster from '../BackdropPoster';
import BackdropInfo from '../BackdropInfo';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageUtils';
import './style.scss';

class Backdrop extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    index: PropTypes.number,
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    genreIds: PropTypes.array,
    releaseDate: PropTypes.string,
    active: PropTypes.bool,
    onEntering: PropTypes.func,
    onChildrenEntered: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    rating: 0,
    genreIds: [],
    releasedDate: '',
    active: false,
    index: 0,
    onEntering: () => {},
    onChildrenEntered: () => {}
  }

  constructor (props) {
    super(props);

    this.state = {
      showPoster: false,
      showBackdropInfo: false
    };
  }

  componentWillMount () {
    this._isAppearing = true;
  }

  showPoster = () => {
    this.setState({
      showPoster: true
    });

    if (this._isAppearing) this._isAppearing = false;
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

    const { posterPath, title } = this.props;
    const { showPoster } = this.state;

    return (
      <BackdropPoster
        styleName="poster-info"
        posterUrl={getPosterUrl(posterPath, 's')}
        title={title}
        active={showPoster}
        onEntered={this.showBackdropInfo}
      />
    );
  } 

  renderInfo = () => {

    const { id, mediaType, title, releaseDate, genreIds, voteAverage, onChildrenEntered } = this.props;
    const { showBackdropInfo } = this.state;

    return (
      <BackdropInfo 
        id={id}
        mediaType={mediaType}
        title={title}
        releaseDate={releaseDate}
        genresIds={genreIds}
        rating={voteAverage}
        active={showBackdropInfo}
        onEntered={onChildrenEntered}
      />
    );
  }


  render() {

    const { backdropPath, active, className, cssModule, index, onEntering } = this.props;
    const classes = Util.mapToCssModules(className, cssModule);

    // Disable transition by css when the first backdrop slide appears,
    // but we still want to fire those transition functions in order to trigger transitions of children
    const firstItemClass =  classNames({'first-backdrop': index === 0 && this._isAppearing}); 

    return (
      <CarouselItem
        styleName={firstItemClass}
        className={classes}
        in={active}
        appear={index === 0}
        onEntering={onEntering}
        onEntered={this.showPoster}
        onExited={this.handleExited}
      >
        <div styleName="backdrop-view">
          <div styleName="backdrop">
            <img src={getBackdropUrl(backdropPath, 'lg')} alt="" />
          </div>
          <div styleName="backdrop-group">
            {this.renderPoster()}
            {this.renderInfo()}
          </div>
        </div>
      </CarouselItem>
    );
  }
}

export default Backdrop;