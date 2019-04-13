import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './ProgressiveImage.scss';

class ProgressiveImage extends React.PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    alt: PropTypes.string,
    blur: PropTypes.bool,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    alt: '',
    blur: true,
    onError: () => {},
    onLoad: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.placeholder,
      loading: true
    };
  }

  componentDidMount () {
    this.loadImage();
  }

  componentDidUpdate (prevProps) {
    const { src, placeholder } = this.props;
    if (src !== prevProps.src) {
      this.setState({
        currentImage: placeholder,
        loading: true
      }, () => {
        this.loadImage();
      });
    }
  }

  componentWillUnmount () {
    if (this.loadingImage) {
      this.loadingImage.onLoad = null;
      this.loadingImage.onError = null;
    }
  }

  loadImage = () => {
    const image = new Image();
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = this.props.src;

    this.loadingImage = image;
  }

  onLoad = (e) => {
    const { onLoad } = this.props;
    this.setState({
      currentImage: this.loadingImage.src,
      loading: false
    }, () => {
      !this.state.loading && onLoad(e)
    });
  }

  onError = (e) => {
    const { onError } = this.props;
    onError && onError(e);
  }

  render () {
    const { currentImage, loading, className, cssModule } = this.state;
    const { alt, blur } = this.props;

    const styles = classNames('image-holder', { 'blurry': loading && blur });
    const classes = mapToCssModules(className, cssModule);

    return (
      <img
        styleName={styles}
        className={classes}
        src={currentImage}
        alt={alt}
      />
    );
  }
}

export default ProgressiveImage;