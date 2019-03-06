import React from 'react';
import PropTypes from 'prop-types';
import { Util, Button, Badge } from 'reactstrap';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import CircleRating from '../CircleRating';
import { getGenres } from '../../constants/genres';
import { getFullYear } from '../../utils/helpers';
import './style.scss';



const infoStyle = {
  opacity: 0,
  transform: 'translateX(2.5rem)',
};

const enterStyle = {
  opacity: 1,
  transform: 'translateX(0)',
  transition: 'transform 0.5s, opacity 0.2s ease-in-out'
};

const transitionStyles = {
  entering: { ...enterStyle },
  entered: { ...enterStyle }
};

class BackdropInfo extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    genresIds: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    rating: PropTypes.number,
    active: PropTypes.bool,
    className: PropTypes.string,
    cssMoudle: PropTypes.object,
    onEntered: PropTypes.func
  }

  static defaultProps = {
    active: false,
    genresIds: [],
    title: '',
    releasedDate: '',
    rating: 0,
    onEntered: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      showRating: false
    };
  }

  handleEntering = () => {
    this.setState({
      showRating: true
    });
  }

  handleExited = () => {
    this.setState({
      showRating: false
    });
  }

  render() {
    const {
      active,
      id,
      mediaType,
      genresIds,
      title,
      releaseDate,
      rating,
      className,
      cssMoudle,
      onEntered
    } = this.props;

    const classes = Util.mapToCssModules(className, cssMoudle);
    const genres = genresIds.map(id => getGenres(id)).slice(0, 3);
    const year = getFullYear(releaseDate);
    const fullTitle = `${title}(${year})`;
    const mediaLink = `/${mediaType}/${id}`;

    return (
      <Transition
        in={active}
        timeout={400}
        appear={true}
        exit={false}
        onEntering={this.handleEntering}
        onEntered={onEntered}
        onExited={this.handleExited}
      >
        {
          (state) => (
            <div
              styleName="backdrop-info"
              className={classes}
              style={{
                ...infoStyle,
                ...transitionStyles[state]
              }}
            >
              <h2 styleName="title">{fullTitle}</h2>
              <div styleName="summary">
                <div styleName="rating">
                  <CircleRating value={rating} max={10} active={this.state.showRating} />
                </div>
                <div styleName="genres">
                  {
                    genres.map(gen => (
                      gen.length > 0 && (<Badge key={gen} color="info">{gen}</Badge>)
                    ))
                  }
                </div>
              </div>
              <Button outline color="info" styleName="info-button">
                <Link to={mediaLink} styleName="info-link">View More</Link>
              </Button>
            </div>
          )
        }

      </Transition >
    );
  }
}

export default BackdropInfo;