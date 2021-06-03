/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import rootReducer from 'src/reducers';
import { ENABLE_REDUX_LOGGER } from 'src/config';

const history = createBrowserHistory();

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account']
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  let persistor = persistStore(store, null, () => {});

  return {store,persistor};
}
