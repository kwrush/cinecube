import React from 'react';
import PropTypes from 'prop-types';
import { CarouselItem, Util } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import BackdropInfo from '../BackdropInfo';
import style from './style.scss';
import BackdropPoster from '../BackdropPoster';

class Backdrop extends React.PureComponent {

  static propTypes = {
    active: PropTypes.bool,
    backdropUrl: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string
  }

  static defaultProps = {
    active: false
  }

  constructor (props) {
    super(props);

    this.state = {
      showBackdropInfo: false
    };
  }

  showBackdropInfo = () => {
    this.setState({
      showBackdropInfo: true
    });
  }

  hideBackdropInfo = () => {
    this.setState({
      showBackdropInfo: false
    });
  }

  renderPoster = ({ active, posterUrl, title }) => {

    const backdropClasses = {
      enter: style['poster-enter'],
      enterActive: style['poster-enter-active'],
      enterDone: style['poster-enter-done'],
      exitActive: style['poster-exit-active']
    };

    return (
      <CSSTransition
        in={active}
        timeout={300}
        classNames={backdropClasses}
        onEntered={this.showBackdropInfo}
        onExited={this.hideBackdropInfo}
        unmountOnExit
      >
        <div styleName="poster">
          <img src={posterUrl} alt={`Poster of ${title}`} />
        </div>
      </CSSTransition>
    );
  } 

  renderInfo = ({ active, title, releasedDate  }) => {

    const { showBackdropInfo } = this.state;

    const infoClasses = {
      enter: style['info-group-enter'],
      enterActive: style['info-group-enter-active'],
      enterDone: style['info-group-enter-done'],
      exit: style['info-group-exit'],
      exitActive: style['info-group-exit-active']
    };

    return (
      <CSSTransition
        in={active && showBackdropInfo}
        timeout={300}
        classNames={infoClasses}
        unmountOnExit
      >
        <BackdropInfo title="Blade Runner 2049" releasedDate="2017-6-1" rating={8.3} />
      </CSSTransition>
    );
  }

  renderBackdropGroup = () => {

    const { active, posterUrl, title } = this.props;
    return (
      <div styleName="backdrop-group">
        <BackdropPoster 
          styleName="poster"
          active={active}
          posterUrl={posterUrl}
          title={title}
          onEntered={this.showBackdropInfo}
          onExiting={this.hideBackdropInfo}
        />
        { this.renderInfo({ ...this.props }) }
      </div>
    );
  }

  render() {

    const { backdropUrl, className, cssModule } = this.props;

    const classes = Util.mapToCssModules(className, cssModule);

    return (
      <CarouselItem className={classes}>
        <div styleName="backdrop-view">
          <div styleName="backdrop">
            <img src={backdropUrl} alt=""/>
          </div>
          { this.renderBackdropGroup() }
        </div>
      </CarouselItem>
    );
  }
}

export default Backdrop;