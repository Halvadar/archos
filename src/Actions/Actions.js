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

export const createuser = props => {
  return (dispatch, getState) => {
    console.log(getState());
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          mutation inputtypes($name:String!, $lastname:String!,$username:String!, $email:String!, $phone:Int,$password:String!,$repassword:String! ) {
            createUser(Input:{name:$name,lastname:$lastname,username:$username,email:$email, phone:$phone,password:$password, repassword:$repassword }){
              name
              username
              lastname
              usertype
     }}`,
        variables: {
          phone: parseInt(props.phone),
          name: props.name,
          lastname: props.lastname,
          username: props.username,
          email: props.email,
          password: props.password,
          repassword: props.repassword
        }
      }
    }).then(result => {
      console.log(result);
      dispatch(setcurrentuser(result));
    });
  };
};

export const createfacebookuser = props => {
  console.log(props);
  return (dispatch, getState) => {
    console.log(getState());
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          mutation inputtypes($name:String!, $lastname:String!,$username:String!, $email:String!, $token:String!, $facebookid:String!, $phone:Int ) {
            createFacebookUser(Input:{name:$name,lastname:$lastname,username:$username,email:$email, phone:$phone, token:$token, facebookid:$facebookid}){
              name
              username
              lastname
              usertype

     }}`,
        variables: {
          phone: parseInt(props.phone),
          name: props.name,
          lastname: props.lastname,
          username: props.username,
          email: props.email,
          token: getState().createuser.token,
          facebookid: getState().createuser.id
        }
      }
    }).then(result => {
      console.log(result);
      dispatch(setcurrentuser(result.data.data.createFacebookUser));
    });
  };
};
export const creategmailuser = props => {
  return (dispatch, getState) => {
    console.log(getState());
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          mutation inputtypes($name:String!, $lastname:String!,$username:String!, $email:String!, $token:String!, $gmailid:String!, $phone:Int ) {
            createGmailUser(Input:{name:$name,lastname:$lastname,username:$username,email:$email, phone:$phone, token:$token, gmailid:$gmailid}){
              name
              username
              lastname
              usertype

     }}`,
        variables: {
          phone: parseInt(props.phone),
          name: props.name,
          lastname: props.lastname,
          username: props.username,
          email: getState().createuser.email,
          token: getState().createuser.token,
          gmailid: getState().createuser.id
        }
      }
    }).then(result => {
      console.log(result);
      dispatch(setcurrentuser(result.data.data));
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
