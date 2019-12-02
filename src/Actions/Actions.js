import { axiosInstance } from "../Configs";
import { Promise } from "q";

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
export const getpostedcards = cards => ({
  type: "GET_POSTED_CARDS",
  cards
});
export const setpostedcards = cards => ({
  type: "SET_POSTED_CARDS"
});

export const logoutuser = () => {
  return (dispatch, getState) => {
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `mutation {
        logoutUser(Input:true){
          name
          username
          lastname
          usertype
        }
      }`
      }
    })
      .then(result => {
        console.log(result);
        dispatch(setcurrentuser(result.data.data.logoutUser));
        console.log(getState().setcurrentuser);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const loginfacebookuser = props => {
  return dispatch => {
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          query inputtypes($id:String!, $token:String!){
            loginFacebook(Input:{id:$id,token:$token}){
              name
              username
              lastname
              usertype
            }
          }
        `,
        variables: { id: props.id, token: props.token }
      }
    }).then(result => {
      console.log(result);
      dispatch(setcurrentuser(result.data.data.loginFacebook));
    });
  };
};
export const logingmailuser = props => {
  return dispatch => {
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          query inputtypes($id:String!, $token:String!){
            loginGoogle(Input:{id:$id,token:$token}){
              name
              username
              lastname
              usertype
            }
          }
        `,
        variables: { id: props.id, token: props.token }
      }
    }).then(result => {
      dispatch(setcurrentuser(result.data.data.loginGoogle));
    });
  };
};

export const loginarchosuser = props => {
  return dispatch => {
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
          query inputtypes($email:String!,$password:String!){
            loginArchos(Input:{email:$email,password:$password}){
              name
              lastname
              username
              usertype
            }
          }
      `,
        variables: { email: props.email, password: props.password }
      }
    }).then(result => {
      console.log(result, "asdasd");
      dispatch(setcurrentuser(result.data.data.loginArchos));
    });
  };
};

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
      dispatch(setcurrentuser(result.data.data.setUser));
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
      dispatch(setcurrentuser(result.data.data.createGmailUser));
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

export const createcard = props => {
  console.log(props);
  return dispatch => {
    const formdata = new FormData();
    formdata.append("image", props.image);

    axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
        mutation inputtypes($title:String!,$description:String!,$category:String!,$subcategory:String,$imageurl:String){ 
          createCard(Input:{title:$title,description:$description,category:$category,subcategory:$subcategory,imageurl:$imageurl}){
            _id
          }}
        `,
        variables: { ...props },
        headers: { "Content-Type": "application/json" }
      }
    })
      .then(result => {
        console.log(result.data.data.createCard);
        formdata.append("_id", result.data.data.createCard._id);

        axiosInstance({
          withCredentials: true,
          url: process.env.REACT_APP_BACKEND_URL + "/uploadimage",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formdata
        });
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };
};

export const checklogin = props => {
  return dispatch => {
    axiosInstance({
      method: "GET",
      withCredentials: true,
      url: process.env.REACT_APP_BACKEND_URL + "/checklogin"
    })
      .then(result => {
        console.log(result.data);
        dispatch(setcurrentuser(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const postedcards = props => {
  return dispatch => {
    dispatch(setpostedcards());
    axiosInstance({
      withCredentials: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        query {
          getPostedCards{
            title
            description
            score
            image
            _id
          }
        }
      `
      }
    })
      .then(result => {
        console.log(result);
        dispatch(getpostedcards(result.data.data.getPostedCards));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
