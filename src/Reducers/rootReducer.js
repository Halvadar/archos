import { combineReducers } from "redux";

const screenstate = {
  screensize: undefined
};

const changescreensize = (state = screenstate, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN_SIZE":
      return { ...state, screensize: action.prop };
    default:
      return state;
  }
};

export default combineReducers({ changescreensize });
