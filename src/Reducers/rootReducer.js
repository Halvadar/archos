import { combineReducers } from "redux";

const screenstate = {
  screensize: undefined,
  scroll: undefined
};

const screen = (state = screenstate, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN_SIZE":
      return { ...state, screensize: action.prop };
    case "SCROLL":
      return { ...state, scroll: action.prop };
    default:
      return state;
  }
};

export default combineReducers({ screen });
