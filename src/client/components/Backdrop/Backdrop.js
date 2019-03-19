import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container,
  Row,
  Col,
  Modal
} from 'reactstrap';
import { MdClose } from 'react-icons/md';
import { find } from 'lodash';
import { Poster } from '../Poster';
import { MediaCard } from '../MediaCard';
import { getPosterUrl } from '../../utils/imageUtils';
import { mapToCssModules } from '../../utils/helpers';
import './Backdrop.scss';

class Backdrop extends React.PureComponent {
  static propTypes = {
    mediaEntities: PropTypes.arrayOf(
      MediaCard.propTypes.mediaEntity
    ),
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntities: []
  }

  constructor (props) {
    super(props);
    this.state = {
      mediaToShow: null,
      mediaCardOpen: false
    };
  }

  closeMediaCard = () => {
    this.setState((preoveState) => ({
      mediaCardOpen: false
    }));
  }

  openMediaCard = id => e => {
    const { mediaEntities } = this.props;
    const entity = find(mediaEntities, ['id', id]);

    this.setState({
      mediaToShow: entity,
      mediaCardOpen: !!entity
    });
  }

  resetMediaToShow = () => {
    this.setState({
      mediaToShow: null
    });
  }

  renderPosters = (entities) => {
    return entities.map(entity => {
      const { posterPath, title, id } = entity
      const poster = getPosterUrl(posterPath, 'm');
      const placeholder = getPosterUrl(posterPath, 'xs');

      return (
        <Col key={`id_${id}`}>
          <Poster
            styleName="poster"
            imageURL={poster}
            previewURL={placeholder}
            title={title}
            onClick={this.openMediaCard(id)}
          />
        </Col>
      );
    });
  }

  renderMediaCard = mediaEntity => {
    const { mediaCardOpen } = this.state;
    const closeButton = (
      <button
        styleName="close-button"
        onClick={this.closeMediaCard}
      >
        <MdClose styleName="close-icon"/>
      </button>
    );
    return (
      <Modal 
        isOpen={mediaCardOpen} 
        toggle={this.closeMediaCard}
        onExit={this.resetMediaToShow}
        external={closeButton}
      >
        <MediaCard mediaEntity={mediaEntity} />
      </Modal>
    );
  }

  render () {
    const { mediaEntities, className, cssModule } = this.props;
    const { mediaToShow } = this.state

    const classes = mapToCssModules(className, cssModule);

    return (
      <Row className={classes}>
        {this.renderPosters(mediaEntities)}
        {mediaToShow && this.renderMediaCard(mediaToShow)}
      </Row>
    );
  }
}

export default Backdrop;