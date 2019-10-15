const click = (state = {}, action) => {
  switch (action.type) {
    case "CLICK":
      console.log("asasd");
      return Object.assign({}, state, action.info);

    default:
      return state;
  }
};

export default click;
