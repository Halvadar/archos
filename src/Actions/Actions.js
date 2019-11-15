import axios from "axios";

export const changescreensize = prop => ({
  type: "CHANGE_SCREEN_SIZE",
  prop
});

export const scroll = prop => ({
  type: "SCROLL",
  prop
});

export const requestcards = prop => ({
  type: "GET_CARDS",
  prop
});

export const setcards = cards => ({
  type: "SET_CARDS",
  cards
});

export const fetchcards = prop => {
  return dispatch => {
    dispatch(requestcards(prop));
    return axios({
      url: "http://localhost:4000/graphql",
      method: "POST",
      data: {
        query: `
          query {getCards{
              title
              description
              image
              score   
     }}`
      },
      headers: { "Content-Type": "application/json" }
    })
      .then(result => {
        console.log(result.data.data.getCards);
        dispatch(setcards(result.data.data.getCards));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
