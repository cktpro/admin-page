// declare redux and saga
// Created by Hung dev
// 05/11/2023

/* quy phạm khai báo user sử dụng Saga */
import { legacy_createuser as createuser, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const user = createuser(
    rootReducer, //khai báo rootReducer
    composeEnhancers(applyMiddleware(sagaMiddleware)) //khai báo Middleware Saga
);

sagaMiddleware.run(rootSaga); //chạy Saga

export default user;