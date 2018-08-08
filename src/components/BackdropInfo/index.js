import React from 'react';
import PropTypes from 'prop-types';
import { Util, Button, Badge } from 'reactstrap';
import CircleRating from '../CircleRating';
import { getGenres } from '../../constants/genres';
import './style.scss';

const propTypes = {
  genresId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  rating: PropTypes.number,
  className: PropTypes.string,
  cssMoudle: PropTypes.object
};

const defaultProps = {
  genresId: [],
  title: '',
  releasedDate: '',
  rating: -1
};

const BackdropInfo = (props) => {
  const { genresId, title, releaseDate, rating, className, cssMoudle } = props;

  const classes = Util.mapToCssModules(className, cssMoudle);
  const genres = genresId.map(id => getGenres(id)).slice(0, 3);

  return (
    <div styleName="backdrop-info" className={classes}>
      <h3>{`${title}(${releaseDate})`}</h3>
      <div>
        {
          genres.map(gen => (
            gen.length > 0 && (<Badge color="info">{gen}</Badge>)
          ))
        }
      </div>
      <div>
        { rating > 0 && <CircleRating value={rating} max={10} /> } 
      </div>
      <Button outline>More</Button>
    </div>
  );
}

BackdropInfo.propTypes = propTypes;
BackdropInfo.defaultProps = defaultProps;

export default BackdropInfo;