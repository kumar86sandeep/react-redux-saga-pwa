import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const history = createBrowserHistory();

  return {
    ...createStore({ rootReducer, routing: routerReducer }, applyMiddleware(sagaMiddleware,logger, routerMiddleware(history))),
    runSaga: sagaMiddleware.run(rootSaga)
  }
};

export default configureStore;