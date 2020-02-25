import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNOUT_SUCCESS, WRITE_DATA, READ_DATA, SOCIAL_AUTH, SIGNOUT_SOCIAL, ADD_POST, DELETE_POST, FETCH_POSTS } from'../actions/authActions';

const initialState = {
  authenticated: false,
  error: '',
  data: [],
  social: [],
  post_added: false,
  posts: []
};

const reducers = (state = initialState, action) => {
    switch(action.type) {
      case AUTHENTICATED:
        return { ...state };
      case SOCIAL_AUTH:
        return {...state, social: action.payload, authenticated: true }
      case UNAUTHENTICATED:
        return { ...state, authenticated: false };
      case AUTHENTICATION_ERROR:
        return { ...state, error: action.payload };
      case SIGNOUT_SUCCESS:
        return {...state, authenticated: false, data: action.payload  };
      case SIGNOUT_SOCIAL:
        return {...state, authenticated: false, social: action.payload };
      case WRITE_DATA:
        return {...state };
      case READ_DATA:
        return {...state, data: action.payload, authenticated: true  };   
      case ADD_POST:
          return {...state, post_added: action.payload};
      case DELETE_POST:
        return {...state };         
      case FETCH_POSTS:
        return {...state, posts: action.payload};       
      default:
        return state;          
    }
}
 
export default reducers;