import { combineReducers } from "redux";

const screenstate = {
  screensize: undefined,
  scroll: undefined
};
const getcardsstate = {
  isfetching: false,
  cards: [],
  category: "all",
  subcategory: "all",
  filterinput: "",
  sorttype: undefined,
  focuscards: false,
  index: undefined
};

const createuserstate = {
  archoserrormessage: undefined,
  gmailerrormessage: undefined,
  facebookerrormessage: undefined,
  method: undefined,
  token: undefined,
  id: undefined,
  email: undefined
};
const currentuser = {
  errormessage: undefined,
  usertype: undefined,
  username: undefined,
  name: undefined,
  lastname: undefined
};

const createdcards = {
  cards: [],
  isfetching: false
};

const emailtokenstate = {
  tokenstate: "invalid"
};
const currentcardstate = {
  isfetching: false,
  card: undefined
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
        subcategory: action.prop.subcategory || undefined,
        index: action.prop.index
      };
    case "SET_CARDS":
      return { ...state, isfetching: false, cards: action.cards };
    case "AZ":
      return { ...state, cards: action.cards, sorttype: "AZ" };
    case "ZA":
      return { ...state, cards: action.cards, sorttype: "ZA" };
    case "RATING":
      return { ...state, cards: action.cards, sorttype: "RATING" };
    case "FILTER_CARDS":
      return { ...state, filterinput: action.prop };
    case "FOCUS_CARDS":
      return { ...state, focuscards: action.prop };
    default:
      return state;
  }
};

const createuser = (state = createuserstate, action) => {
  switch (action.type) {
    case "CREATE_FACEBOOK_USER":
      return {
        ...state,
        id: action.user.id,
        token: action.user.token,
        method: action.user.method
      };
    case "CREATE_GMAIL_USER":
      return {
        ...state,
        id: action.user.id,
        token: action.user.token,
        email: action.user.email,
        method: action.user.method
      };
    case "REGISTER_ARCHOS_USER_ERROR":
      return { ...state, archoserrormessage: action.errormessage };
    case "REGISTER_FACEBOOK_USER_ERROR":
      return { ...state, facebookerrormessage: action.errormessage };
    case "REGISTER_GMAIL_USER_ERROR":
      return { ...state, gmailerrormessage: action.errormessage };
    default:
      return state;
  }
};

const setcurrentuser = (state = currentuser, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, ...action.user };
    case "ERROR":
      return { ...state, errormessage: action.prop };
    default:
      return state;
  }
};

const getpostedcards = (state = createdcards, action) => {
  switch (action.type) {
    case "GET_POSTED_CARDS":
      return { ...state, cards: action.cards, isfetching: false };
    case "SET_POSTED_CARDS":
      return { ...state, isfetching: true };

    default:
      return state;
  }
};

const setemailtokenstate = (state = emailtokenstate, action) => {
  switch (action.type) {
    case "EMAIL_TOKEN_STATE":
      return { ...state, tokenstate: action.prop };

    default:
      return state;
  }
};
const setcurrentcard = (state = currentcardstate, action) => {
  switch (action.type) {
    case "GET_CURRENT_CARD":
      return { ...state, isfetching: true };
    case "SET_CURRENT_CARD":
      return { ...state, isfetching: false, card: action.prop };
    case "SET_CURRENT_CARD_SCORE":
      return {
        ...state,
        isfetching: false,
        card: { ...state.card, score: action.prop }
      };
    case "SET_CURRENT_CARD_COMMENT":
      return { ...state, card: { ...state.card, comments: action.prop } };
    default:
      return state;
  }
};

export default combineReducers({
  screen,
  getcards,
  createuser,
  setcurrentuser,
  getpostedcards,
  setemailtokenstate,
  setcurrentcard
});
