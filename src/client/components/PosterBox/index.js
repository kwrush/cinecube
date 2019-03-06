import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip, Util } from 'reactstrap';
import classNames from 'classnames';
import Poster from '../Poster';
import './style.scss'


class PosterBox extends React.PureComponent {

  static propTypes = {
    posterUrl: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    tooltip: PropTypes.bool,
    hover: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    title: 'Media',
    tooltip: true,
    hover: true
  }

  constructor (props) {
    super(props);

    this.state = {
      posterBox: null
    };
  }

  componentWillMount() {
    this._posterBox = null;
  }

  componentDidMount () {
    this.setState({
      posterBox: this._posterBox
    });
  }

  renderTooltip = () => {

    let { posterBox } = this.state;

    return (posterBox === null
      ? null
      : (
        <UncontrolledTooltip
          placement="bottom"
          target={posterBox}
        >
          {this.props.title}
        </UncontrolledTooltip>
      ));
  }

  render() {

    const {
      posterUrl,
      linkUrl,
      title,
      tooltip,
      hover,
      className,
      cssModule
    } = this.props;

    const classes = Util.mapToCssModules(className, cssModule);
    const styleClasses = classNames('poster-box', {hover: hover});

    return (
      <div
        ref={el => this._posterBox = el}
        styleName={styleClasses}
        className={classes}
      >
        <Link to={linkUrl} styleName="poster-link">
          <Poster imageUrl={posterUrl} title={title} />  
        </Link>
        { tooltip && this.renderTooltip() }
      </div>
    );
  }
}

export default PosterBox;