import { combineReducers } from "redux";

const screenstate = {
  screensize: undefined,
  scroll: undefined
};
const getcardsstate = {
  isfetching: false,
  cards: [],
  category: "all",
  subcategory: "all"
};

const screen = (state = screenstate, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN_SIZE":
      return {
        ...state,
        screensize: action.prop
      };
    case "SCROLL":
      return { ...state, scroll: action.prop };
    default:
      return state;
  }
};

const getcards = (state = getcardsstate, action) => {
  switch (action.type) {
    case "GET_CARDS":
      return {
        ...state,
        isfetching: true,
        category: action.prop.category || undefined,
        subcategory: action.prop.subcategory || undefined
      };
    case "SET_CARDS":
      return { ...state, isfetching: false, cards: action.cards };
    default:
      return state;
  }
};

export default combineReducers({ screen, getcards });
