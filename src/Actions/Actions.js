import { axiosInstance } from "../Configs";
import { Promise } from "q";

export const sortcards = (prop) => ({
  type: prop.type,
  cards: prop.cards,
});
export const filtercards = (prop) => ({
  type: "FILTER_CARDS",
  prop,
});
export const focuscards = (prop) => ({
  type: "FOCUS_CARDS",
  prop,
});

export const changescreensize = (prop) => ({
  type: "CHANGE_SCREEN_SIZE",
  prop,
});

export const scroll = (prop) => ({
  type: "SCROLL",
  prop,
});

export const requestcards = (prop) => ({
  type: "GET_CARDS",
  prop,
});

export const setcards = (cards) => ({
  type: "SET_CARDS",
  cards,
});
export const initializefacebookuser = (user) => ({
  type: "CREATE_FACEBOOK_USER",
  user,
});
export const initializegmailuser = (user) => ({
  type: "CREATE_GMAIL_USER",
  user,
});
export const setcurrentuser = (user) => ({
  type: "SET_CURRENT_USER",
  user,
});
export const getpostedcards = (cards) => ({
  type: "GET_POSTED_CARDS",
  cards,
});
export const setpostedcards = (cards) => ({
  type: "SET_POSTED_CARDS",
});
export const emailtoken = (prop) => ({
  type: "EMAIL_TOKEN_STATE",
  prop,
});
export const setcurrentcard = (prop) => ({
  type: "SET_CURRENT_CARD",
  prop,
});
export const getcurrentcard = () => ({
  type: "GET_CURRENT_CARD",
});
export const setcurrentcardscore = (prop) => ({
  type: "SET_CURRENT_CARD_SCORE",
  prop,
});
export const setcurrentcardcomment = (prop) => ({
  type: "SET_CURRENT_CARD_COMMENT",
  prop,
});
export const loginerror = (prop) => ({
  type: "ERROR",
  prop,
});

export const registererror = (prop) => ({
  type: prop.type,
  errormessage: prop.errormessage,
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
      }`,
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.logoutUser));
      })
      .catch((err) => {});
  };
};

export const loginfacebookuser = (props) => {
  return (dispatch) => {
    return axiosInstance({
      withCredentials: true,
      credentials:'include',
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
        variables: { id: props.id, token: props.token },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.loginFacebook));
        props.that.props.closeloginform();
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(loginerror(err.response.data));
        }
      });
  };
};
export const logingmailuser = (props) => {
  return (dispatch) => {
    return axiosInstance({
      withCredentials: true,
      credentials:'include',
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
        variables: { id: props.id, token: props.token },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.loginGoogle));
        props.that.props.closeloginform();
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(loginerror(err.response.data));
        }
      });
  };
};

export const loginarchosuser = (props) => {
  return (dispatch) => {
    return axiosInstance({
      withCredentials: true,
      credentials:'include',
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
        variables: { email: props.email, password: props.password },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.loginArchos));
        dispatch(loginerror(null));
        props.that.props.closeloginform();
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(loginerror(err.response.data));
        }
      });
  };
};

export const createuser = (props) => {
  return async (dispatch, getState) => {
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
          repassword: props.repassword,
        },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.setUser));
      })
      .catch((err) => {
        dispatch(
          registererror({
            errormessage: err.response.data,
            type: "REGISTER_ARCHOS_USER_ERROR",
          })
        );
      });
  };
};

export const createfacebookuser = (props) => {
  return (dispatch, getState) => {
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
          facebookid: getState().createuser.id,
        },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.createFacebookUser));
      })
      .catch((err) => {
        dispatch(
          registererror({
            errormessage: err.response.data,
            type: "REGISTER_FACEBOOK_USER_ERROR",
          })
        );
        return true;
      });
  };
};
export const creategmailuser = (props) => {
  return (dispatch, getState) => {
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
          gmailid: getState().createuser.id,
        },
      },
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data.data.createGmailUser));
      })
      .catch((err) => {
        dispatch(
          registererror({
            errormessage: err.response.data,
            type: "REGISTER_GMAIL_USER_ERROR",
          })
        );
        return true;
      });
  };
};

export const fetchcards = (props) => {
  return (dispatch) => {
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
              score{score}
              _id   
     }}`,
        variables: { category: props.category, subcategory: props.subcategory },
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        let cards = result.data.data.getCards.map((a) => {
          if (a.score.length > 0) {
            let score = 0;
            let i = 0;
            while (i < a.score.length) {
              score = score + parseFloat(a.score[i].score);
              i++;
            }

            score = score / a.score.length;

            return { ...a, score: score.toFixed(2) };
          } else {
            return { ...a, score: "Not Rated" };
          }
        });

        dispatch(setcards(cards));
      })
      .catch((err) => {});
  };
};

export const createcard = (props) => {
  return (dispatch) => {
    return axiosInstance({
      withCredentials: true,
      method: "POST",
      data: {
        query: `
        mutation inputtypes($title:String!,$description:String!,$category:String!,$subcategory:String,$imageurl:String,$email:String,$phone:Int){ 
          createCard(Input:{title:$title,description:$description,category:$category,subcategory:$subcategory,imageurl:$imageurl,email:$email,phone:$phone}){
            _id
          }}
        `,
        variables: { ...props },
        headers: { "Content-Type": "application/json" },
      },
    })
      .then(async (result) => {
        let formdata;

        if (props.image) {
          formdata = new FormData();
          formdata.append("image", props.image);
          formdata.append("_id", result.data.data.createCard._id);
          await axiosInstance({
            withCredentials: true,
            url: process.env.REACT_APP_BACKEND_URL + "/uploadimage",
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          });
        }

        return result.data.data.createCard._id;
      })
      .then((result) => {
        return result;
      })
      .catch((err) => false);
  };
};

export const checklogin = (props) => {
  return (dispatch) => {
    axiosInstance({
      method: "GET",
      withCredentials: true,
      credentials:'include',
      url: process.env.REACT_APP_BACKEND_URL + "/checklogin",
    })
      .then((result) => {
        dispatch(setcurrentuser(result.data));
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

export const postedcards = (props) => {
  return (dispatch) => {
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
            score{score}
            image
            _id
          }
        }
      `,
      },
    })
      .then((result) => {
        let cards = result.data.data.getPostedCards.map((a) => {
          if (a.score.length > 0) {
            let score = 0;
            let i = 0;
            while (i < a.score.length) {
              score = score + parseFloat(a.score[i].score);
              i++;
            }

            score = score / a.score.length;

            return { ...a, score: score.toFixed(2) };
          } else {
            return { ...a, score: "Not Rated" };
          }
        });
        dispatch(getpostedcards(cards));
      })
      .catch((err) => {});
  };
};

export const changepassword = (props) => {
  return async (dispatch) => {
    await axiosInstance({
      withCredentials: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        query: `mutation types($email:String!){
          changePassword(email:$email){
            result
          }
        }`,
        variables: { ...props },
      },
    })
      .then((result) => {
        if (result.data.data.changePassword.result) {
          dispatch(emailtoken("valid"));
        }
      })
      .catch((err) => {
        props.result.error = err.response.data;
      });
  };
};
export const changepasswordconfirmation = (props) => {
  return async (dispatch) => {
    await axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        mutation types($changepassword:String!,$token:String!) {
          changePasswordConfirmation(changepassword:$changepassword,token:$token){
            result
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((result) => {
        dispatch(emailtoken("successful"));
      })
      .then(() => {
        setTimeout(() => {
          dispatch(emailtoken("invalid"));
        }, 5000);
      })
      .catch((err) => {
        props.result.error = err.response.data;
      });
  };
};

export const deleteuser = ({ props, result }) => {
  return async (dispatch) => {
    await axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        mutation types($email:String!,$password:String) {
          deleteUser(email:$email,password:$password){
            result
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((deleteresult) => {
        if (deleteresult.data.data.deleteUser.result) {
          result.result = deleteresult.data.data.deleteUser.result;
        }
      })
      .catch((err) => {
        result.error = err.response.data;
      });
  };
};

export const deleteuserconfirmation = ({ props, result }) => {
  return async (dispatch) => {
    await axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        mutation types($token:String!) {
          deleteUserConfirmation(token:$token){
            result
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((confirmationresult) => {
        if (confirmationresult.data.data.deleteUserConfirmation.result) {
          result.result =
            confirmationresult.data.data.deleteUserConfirmation.result;
        }
      })
      .catch((err) => {
        result.error = err.response.data;
      });
  };
};

export const getcard = (props) => {
  return async (dispatch) => {
    dispatch(getcurrentcard());
    await axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        query type($id:String!){
          getCard(id:$id){
            image
            description
            title
            score{score}
            createdby{username}
            _id
            category
            subcategory
            comments{comment commentedby{username name _id lastname} date}
            email
            phone
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((result) => {
        dispatch(
          setcurrentcard({
            ...result.data.data.getCard,
            comments: result.data.data.getCard.comments.reverse(),
          })
        );
      })
      .catch((err) => {});
  };
};

export const ratecard = (props) => {
  return async (dispatch, getState) => {
    await axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        mutation type($id:String!,$score:Int!){
          rateCard(id:$id,score:$score){
           score{score}
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((result) => {
        if (getState().setcurrentcard.card) {
          dispatch(setcurrentcardscore(result.data.data.rateCard.score));
        }
      })
      .catch((err) => {});
  };
};

export const comment = (props) => {
  return (dispatch) => {
    axiosInstance({
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        mutation type($id:String!,$comment:String!){
          comment(id:$id,comment:$comment){
           comment
           commentedby{username}
           date
          }
        }
      `,
        variables: { ...props },
      },
    })
      .then((res) => {
        dispatch(setcurrentcardcomment(res.data.data.comment.reverse()));
      })
      .catch((err) => {});
  };
};
