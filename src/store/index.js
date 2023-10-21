// declare redux and saga
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo store sử dụng Saga */
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, //khai báo rootReducer
  composeEnhancers(applyMiddleware(sagaMiddleware)) //khai báo Middleware Saga
);

sagaMiddleware.run(rootSaga); //chạy Saga

export default store;
