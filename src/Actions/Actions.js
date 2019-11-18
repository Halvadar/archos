import { axiosInstance } from "../Configs";

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

export const fetchcards = props => {
  return dispatch => {
    console.log(props.category);
    dispatch(requestcards(props));
    return axiosInstance({
      method: "POST",
      data: {
        query: `
          query inputtypes($category:String!, $subcategory:String!) {
            getCards(Input:{category:$category, subcategory:$subcategory}){
              title
              description
              image
              score
              _id   
     }}`,
        variables: { category: props.category, subcategory: props.subcategory }
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
