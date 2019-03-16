import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProgressiveImage.scss';

class ProgressiveImage extends React.PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onError: PropTypes.func
  }

  static defaultProps = {
    alt: '',
    onError: () => {}
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

  onLoad = () => {
    this.setState({
      currentImage: this.loadingImage.src,
      loading: false
    });
  }

  onError = (e) => {
    const { onError } = this.props;
    onError && onError(e);
  }

  render () {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;

    const classes = classNames('image-holder', { 'blurry': loading });

    return <img styleName={classes} src={currentImage} alt={alt} />;
  }
}

export default ProgressiveImage;