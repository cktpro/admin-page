import {
    addUserApi,
    deleteUserApi,
    getListUserApi,
    infoUserApi,
    updateUserApi,
  } from "api/userApi";
  import { put, takeLeading } from "redux-saga/effects";
  
  import { notification } from "antd";
  import {
    actionAddUserFailed,
    actionAddUserSuccess,
    actionDeleteUserFailed,
    actionDeleteUserSuccess,
    actionGetListUserFailed,
    actionGetListUserSuccess,
    actionInfoUserFailed,
    actionInfoUserSuccess,
    actionUpdateUserFailed,
    actionUpdateUserSuccess,
  } from "./action";
  import * as ActionTypes from "./actionTypes";
  function* getListUser(action) {
    try {
      const response = yield getListUserApi(action.payload);
  
      yield put(actionGetListUserSuccess(response.data.payload));
    } catch (error) {
      yield put(actionGetListUserFailed(error));
    }
  }
  
  function* addUser(action) {
    try {
      const response = yield addUserApi(action.payload);
  
      yield put(actionAddUserSuccess(response.data.payload));
      if (response.data.code === 200)
        notification.open({
          message: "Thêm người dùng thành công",
          type: "success",
        });
    } catch (error) {
      yield put(actionAddUserFailed(error));
      notification.open({
        message: "Thêm người dùng thất bại",
        type: "error",
      });
    }
  }
  
  function* infoUser(action) {
    try {
      const response = yield infoUserApi(action.payload);
  
      yield put(actionInfoUserSuccess(response.data.payload));
    } catch (error) {
      yield put(actionInfoUserFailed(error));
    }
  }
  
  function* updateUser(action) {
    try {
      const response = yield updateUserApi(action.payload);
  
      yield put(actionUpdateUserSuccess(response.data.payload));
      if (response.data.code === 200)
        notification.open({
          message: "Cập nhật người dùng thành công",
          type: "success",
        });
    } catch (error) {
      yield put(actionUpdateUserFailed(error));
      notification.open({
        message: "Cập nhật người dùng thất bại",
        type: "error",
      });
    }
  }
  
  function* deleteUser(action) {
    try {
      const response = yield deleteUserApi(action.payload);
      if (response.data.code === 200) {
        yield put(actionDeleteUserSuccess(action.payload));
        notification.open({
          message: "Xóa người dùng thành công",
          type: "success",
        });
      }
    } catch (error) {
      yield put(actionDeleteUserFailed(error));
      notification.open({
        message: "Xóa người dùng thất bại",
        type: "error",
      });
    }
  }
  
  export default function* usersaga() {
    yield takeLeading(ActionTypes.LIST_USER, getListUser);
    yield takeLeading(ActionTypes.ADD_USER, addUser);
    yield takeLeading(ActionTypes.INFO_USER, infoUser);
    yield takeLeading(ActionTypes.UPDATE_USER, updateUser);
    yield takeLeading(ActionTypes.DELETE_USER, deleteUser);
  }