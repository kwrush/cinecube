import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import Loading from 'components/Loading/index';

const propTypes = {
  items: ImmutablePropTypes.iterable,
  loadData: PropTypes.func,
  loadingEffectSize: PropTypes.oneOf(['small', 'normal', 'large'])
};

const defaultProps = {
  items: List(),
  loadData: () => {},
  loadingEffectSize: 'normal'
}

const LoadingHOC = (WrappedComponent) => {
  class _LoadingHOC extends React.Component {
    componentWillMount () {
      this.props.loadData();
    }

    render () {
      const { items } = this.props;
      return items.size > 0 
        ? <WrappedComponent { ...this.props } />
        : <Loading size={this.props.loadingEffectSize} />
    }
  }

  _LoadingHOC.propTypes = propTypes;
  _LoadingHOC.defaultProps = defaultProps;

  return _LoadingHOC;
};

export default LoadingHOC;