import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import appReducer from 'reducers/index';
import DevTools from 'containers/DevTools/index';

const configureStore = preloadedState => {
  const store = createStore(
    appReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(appReducer);
    })
  }

  return store;
};

export default configureStore;