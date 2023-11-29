import * as ActionTypes from "./actionTypes";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const defaultState = {
  listStatus: { ...status },
  actionStatus: { ...status },
  deleteStatus: { ...status },
  list: [],
  detail: {},
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_USER:
      return {
        ...state,
        listStatus: { isLoading: true, isSuccess: false, isFailure: false },
      };

    case ActionTypes.LIST_USER_SUCCESS:
      return {
        ...state,
        list: action.payload,
        listStatus: { ...state.listStatus, isLoading: false, isSuccess: true },
      };

    case ActionTypes.LIST_USER_FAILED:
      return {
        ...state,
        list: [],
        listStatus: { ...state.listStatus, isLoading: false, isFailure: true },
      };

    case ActionTypes.ADD_USER:
      return {
        ...state,
        actionStatus: { isLoading: true, isSuccess: false, isFailure: false },
      };

    case ActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isSuccess: true,
        },
      };

    case ActionTypes.ADD_USER_FAILED:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isFailure: true,
        },
      };

    case ActionTypes.INFO_USER:
      return {
        ...state,
        actionStatus: { isLoading: true, isSuccess: false, isFailure: false },
      };

    case ActionTypes.INFO_USER_SUCCESS:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isSuccess: true,
        },
        detail: action.payload,
      };

    case ActionTypes.INFO_USER_FAILED:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isFailure: true,
        },
        detail: {},
      };

    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        actionStatus: { isLoading: true, isSuccess: false, isFailure: false },
      };

    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isSuccess: true,
        },
        detail: action.payload,
      };

    case ActionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
        actionStatus: {
          ...state.actionStatus,
          isLoading: false,
          isFailure: true,
        },
      };

    case ActionTypes.DELETE_USER:
      return {
        ...state,
        deleteStatus: { isLoading: true, isSuccess: false, isFailure: false },
      };

    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteStatus: {
          ...state.deleteStatus,
          isLoading: false,
          isSuccess: true,
        },
        list: state.list.filter((item) => item.id !== action.payload),
      };

    case ActionTypes.DELETE_USER_FAILED:
      return {
        ...state,
        deleteStatus: {
          ...state.deleteStatus,
          isLoading: false,
          isFailure: true,
        },
      };

    case ActionTypes.RESET_LIST_USER:
      return defaultState;

    default:
      return state;
  }
};

export default userReducer;