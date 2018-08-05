import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip, Util } from 'reactstrap';
import './style.scss'


class Poster extends React.Component {

  static propTypes = {
    posterUrl: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    title: '',
    width: '202px',
    height: '300px'
  }

  constructor (props) {
    super(props);

    this.state = {
      poster: null
    };
  }

  componentWillMount() {
    this._poster = null;
  }

  componentDidMount () {
    this.setState({
      poster: this._poster
    });
  }

  renderTooltip = () => {
    return (this.state.poster === null
      ? null
      : (
        <UncontrolledTooltip
          placement="bottom"
          target={this.state.poster}
        >
          {this.props.title}
        </UncontrolledTooltip>
      ));
  }

  render() {

    const {
      posterUrl,
      linkUrl,
      width,
      height,
      title,
      className,
      cssModule
    } = this.props;

    const classes = Util.mapToCssModules(className, cssModule);

    const styles = {
      width: width,
      height: height
    };

    return (
      <div
        ref={el => this._poster = el}
        styleName="poster"
        className={classes}
        style={styles}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      >
        <Link to={linkUrl} styleName="poster-link">
          <img src={posterUrl} alt={`poster of ${title}`} styleName="poster-img" />
        </Link>
        { this.renderTooltip() }
      </div>
    );
  }
}

export default Poster;