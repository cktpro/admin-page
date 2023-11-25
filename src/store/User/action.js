import * as ActionTypes from "./actionTypes";

export const actionGetListUser = (payload) => ({
  type: ActionTypes.LIST_USER,
  payload,
});

export const actionGetListUserSuccess = (payload) => ({
  type: ActionTypes.LIST_USER_SUCCESS,
  payload,
});

export const actionGetListUserFailed = (payload) => ({
  type: ActionTypes.LIST_USER_FAILED,
  payload,
});

export const actionAddUser = (payload) => ({
  type: ActionTypes.ADD_USER,
  payload,
});

export const actionAddUserSuccess = (payload) => ({
  type: ActionTypes.ADD_USER_SUCCESS,
  payload,
});

export const actionAddUserFailed = (payload) => ({
  type: ActionTypes.ADD_USER_FAILED,
  payload,
});

export const actionInfoUser = (payload) => ({
  type: ActionTypes.INFO_USER,
  payload,
});

export const actionInfoUserSuccess = (payload) => ({
  type: ActionTypes.INFO_USER_SUCCESS,
  payload,
});

export const actionInfoUserFailed = (payload) => ({
  type: ActionTypes.INFO_USER_FAILED,
  payload,
});

export const actionUpdateUser = (payload) => ({
  type: ActionTypes.UPDATE_USER,
  payload,
});

export const actionUpdateUserSuccess = (payload) => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload,
});

export const actionUpdateUserFailed = (payload) => ({
  type: ActionTypes.UPDATE_USER_FAILED,
  payload,
});

export const actionDeleteUser = (payload) => ({
  type: ActionTypes.DELETE_USER,
  payload,
});

export const actionDeleteUserSuccess = (payload) => ({
  type: ActionTypes.DELETE_USER_SUCCESS,
  payload,
});

export const actionDeleteUserFailed = (payload) => ({
  type: ActionTypes.DELETE_USER_FAILED,
  payload,
});

export const actionReset = () => ({
  type: ActionTypes.RESET_LIST_USER,
});