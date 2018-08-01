import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/index';

const propTypes = {
  isLoading: PropTypes.bool,
  loaderColor: PropTypes.string,
  onLoad: PropTypes.func
};

const defaultProps = {
  isLoading: false,
  loaderColor: '#343A40',
  onLoad: () => {}
};

const LoadingHOC = WrappedComponent => {
  
  class _LoadingHOC extends React.Component {
    componentWillMount () {
      this.props.onLoad();
    }

    renderLoader = () => {
      return (
        <div className="mr-auto ml-auto">
          <Loader color={this.props.loaderColor}/>
        </div>
      );
    }

    render () {
      const { isLoading, onLoad, ...otherProps } = this.props;

      return isLoading
        ? <WrappedComponent { ...otherProps } />
        : this.renderLoader() 
    }
  }

  _LoadingHOC.propTypes = propTypes;
  _LoadingHOC.defaultProps = defaultProps;

  return _LoadingHOC;
};

export default LoadingHOC;