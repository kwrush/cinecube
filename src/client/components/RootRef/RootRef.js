import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * Copied from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/RootRef/RootRef.js
 */

const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

class RootRef extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
  }

  componentDidMount() {
    this.ref = ReactDOM.findDOMNode(this);
    setRef(this.props.rootRef, this.ref);
  }

  componentDidUpdate(prevProps) {
    const ref = ReactDOM.findDOMNode(this);

    if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
      if (prevProps.rootRef !== this.props.rootRef) {
        setRef(prevProps.rootRef, null);
      }

      this.ref = ref;
      setRef(this.props.rootRef, this.ref);
    }
  }

  componentWillUnmount() {
    this.ref = null;
    setRef(this.props.rootRef, null);
  }

  render() {
    return this.props.children;
  }
};

export default RootRef;