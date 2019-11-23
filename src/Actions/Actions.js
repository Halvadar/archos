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
export const initializefacebookuser = user => ({
  type: "CREATE_FACEBOOK_USER",
  user
});
export const initializegmailuser = user => ({
  type: "CREATE_GMAIL_USER",
  user
});
export const setcurrentuser = user => ({
  type: "SET_CURRENT_USER",
  user
});
export const createfacebookuser = props => {
  return (dispatch, getState) => {
    return axiosInstance({
      method: "POST",
      data: {
        query: `
          query inputtypes($name:String, $lastname:String,$username:String!, $email:String!, $token:String!, $facebookid:String!, $phone:Int ) {
            createFacebookUser(Input:{name:$name,lastname:$lastname,username:$username,email:$email, token:$token, facebookid:$facebookid}){
              name
              username
              lastname

     }}`,
        variables: {
          name: props.name,
          lastname: props.lastname,
          username: props.username,
          email: props.email,
          token: getState().createuser.token,
          facebookid: getState().createuser.facebookid
        }
      }
    }).then(result => {
      dispatch(setcurrentuser(result));
    });
  };
};

export const fetchcards = props => {
  console.log("asd");
  return dispatch => {
    console.log(props);
    dispatch(requestcards(props));
    return axiosInstance({
      method: "POST",
      data: {
        query: `
          query inputtypes($category:String, $subcategory:String) {
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
