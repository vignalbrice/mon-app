import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "../../API/Firebase";
import Swal from 'sweetalert2'

export const AUTHENTICATED = 'authenticated_user';
export const SOCIAL_AUTH = 'authenticated_social_user'
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_SOCIAL = 'signout_social';
export const WRITE_DATA = 'write_data';
export const READ_DATA = 'read_data';
export const SEARCH_BAR = 'search_bar';
export const ADD_POST = 'add_post';
export const DELETE_POST = 'delete_post';
export const FETCH_POSTS = 'fetch_posts';
export const UPDATE_BIO = 'update_bio';
/***Initialize database */
firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.firestore();
export const authRef = firebase.auth();
export const storageRef =  firebase.storage();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const facebookAuth = new firebase.auth.FacebookAuthProvider();

export const isSearch = searchbar =>{
    return{
      type: SEARCH_BAR,
      payload: searchbar
    }
}

export const signIn = ( email, password, history) => {
  return async (dispatch) => {
    try {
        await authRef.signInWithEmailAndPassword(email,password).then(data => {
        dispatch(readUserData(data.user.uid, history));
      }).catch(error =>errorHandler(error.code));
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export const signWithSocial = (history,google) =>{
    return async (dispatch) => {
      // Using a popup.
      var providerFacebook = new firebase.auth.FacebookAuthProvider();
      var providerGoogle = new firebase.auth.GoogleAuthProvider();
      if(google ==='google'){
        providerGoogle.addScope('profile');
        providerGoogle.addScope('email');
        providerGoogle.addScope('https://www.googleapis.com/auth/user.birthday.read	');
      }
      if(google ===''){
          providerFacebook.addScope('user_birthday');
          providerFacebook.setCustomParameters({
            'display': 'popup'
          });
      }
      authRef.signInWithPopup(google === 'google' ? providerGoogle : providerFacebook).then(function(result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      var user = result.user;
        if(result.additionalUserInfo.isNewUser === false){
          localStorage.setItem('user', token);
          dispatch(readUserData(user.uid,history))
        }else if(result.additionalUserInfo.isNewUser === true){
            user.providerData.forEach(item => {
              localStorage.setItem('user', token);
              dispatch(writeUserData(user.uid,result.additionalUserInfo.profile.firstname,
                                     result.additionalUserInfo.profile.lastname,'',item, 
                                     user.photoURL, result.additionalUserInfo.profile.birthday))  
            });
        }
    });
  }
}

export const signUp = ( nom, prenom, email, password , history) =>{
  return async (dispatch) => {
    try {
     await authRef.createUserWithEmailAndPassword(email, password).then(data =>{
        console.log(data.user)
        const userUid = data.user.uid;
        dispatch(writeUserData(userUid, nom, prenom, email));
        localStorage.setItem('user', data);
        history.push('/Feed');
     }).catch(error =>errorHandler(error.code));
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}
export const writeUserData = (id, nom, prenom, email, data, photo, birthday) =>{
  return async (dispatch) => {
      try{
          if(id){
              var today = new Date();
              databaseRef.collection('users').doc(id).set({
                  id: id,
                  nom: nom,
                  prenom: prenom,
                  email: email,
                  registered: today
              })
            }
          if(data){
            var today = new Date();
            databaseRef.collection('users').doc(id).set({
                id: id,
                nom: nom,
                prenom: prenom,
                username: data.displayName,
                photo: photo,
                phoneNumber: data.phoneNumber,
                birthday: birthday =! null || undefined ? birthday : '',
                email: data.email,
                registered: today,
                provider: data.providerId 
            })
          }
        dispatch({ type: WRITE_DATA })
      }catch(error){

      }
  }
}
export const readUserData = (id, history) =>{
  return async dispatch => {
    try{
      if(id){
        await databaseRef.collection('users').doc(id).onSnapshot(querySnapshot =>{
          dispatch({ type: READ_DATA, payload: querySnapshot.data() })
          localStorage.setItem('user', querySnapshot.id);
          history.push('/Feed');
        })
      }
    }catch(error){
      Swal.fire({
        title: 'Oops...Something went wrong!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  }
}
/** Upload Post Image From Link into Bucket Storage */
export const uploadPostPhoto = (file, title, desc) =>{
  return async dispatch =>{
    const ref = firebase.storage().ref().child(`post/${authRef.currentUser.uid}/${file.name}`);
    const uploadTask = ref.put(file)
    const getProgress = snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress === 100 ? Swal.hideLoading() : Swal.showLoading('Upload is ' + progress + '% done');
    

      if(snapshot.state == firebase.storage.TaskState.PAUSED) {
          console.log('Upload is paused');
      } else if (snapshot.state == firebase.storage.TaskState.RUNNING) {
          console.log('Upload is running');
      }    
  };
  const error = err => { console.log('une erreur est survenue : ', err); };
  const complete = () => {
      ref.getDownloadURL().then(downloadURL => {
          dispatch(addUserPost(downloadURL, title, desc));
      });
  };

  uploadTask.on('state_changed', getProgress, error, complete);
  }
}
export const addUserPost = (img, title, desc) =>{
  return async dispatch => {
    var userId = authRef.currentUser.uid;
    try{
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var autoId = ''
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      let post ={
        id: autoId,
        img,
        title,
        desc
      }
      const doc = await databaseRef.collection('users').doc(userId).get();
      const postRef = await databaseRef.collection('users').doc(userId);
      const postId = doc.data().posts.filter(item => item.id === doc.data().posts.id);
      if (doc.data().posts !== -1) {
          postRef.update({
              posts: doc.data().posts === undefined || doc.data().posts.length === 0 ? [post] : [...doc.data().posts, post]
            })
      }else{
          postRef.update({
              posts: [...doc.data().posts, post]
          })
      }
      dispatch({type : ADD_POST, payload: true})
    }catch(error){
      Swal.fire({
        title: 'Oops...Something went wrong!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  }
}
export const deleteUserPost = (id) =>{
  return async dispatch => {
      const postRef = databaseRef.collection('users').doc(authRef.currentUser.uid);
      const doc = await databaseRef.collection('users').doc(authRef.currentUser.uid).get();
      const postId = doc.data().posts.filter(item => item.id === id);
      const postArray = doc.get('posts');
        postRef.update({
          posts : postArray.length === 1 ? postArray.slice(0,postId) : [...postArray.slice(0,postId),...postArray.slice(postId, +1)]
        })
        Swal.fire({
          title: 'Post Deleted !',
          text: 'Your post is deleted !',
          icon: 'success',
          confirmButtonText: 'Okay',
        })
        dispatch({type : DELETE_POST })
    } 
}
export const fetchUserPost = () =>{
  return async dispatch =>{
   await databaseRef.collection(`users`)
    .doc(authRef.currentUser.uid).onSnapshot((querySnapshot) => {
      console.log(querySnapshot.data().posts)
      dispatch({type : FETCH_POSTS, payload: querySnapshot.data().posts})
    })
  }
}
export const updateMiniBio = (id, bio) =>{
  return async dispatch =>{
    try{
      await databaseRef.collection('users').doc(id).update({
        bio : [bio, ...bio]
      })
      dispatch({ type: UPDATE_BIO })
    }catch(error){
      Swal.fire({
        title: 'Oops...Something went wrong!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  }
}
export const errorHandler = errorCode =>{
    var messageTxt;
    switch (errorCode){
        case 'auth/invalid-email':
          messageTxt ="Adresse e-mail incorrecte !";
          break;
        case 'auth/user-not-found':
          messageTxt ="Utilisateur inconnue !";
          break;
        case 'auth/wrong-password':
          messageTxt ="Mot de passe incorrecte !";
          break;
        case 'auth/email-already-in-use':
          messageTxt ="Adresse e-mail déjà utilisé !";
          break;
        case 'auth/user-not-found':
          messageTxt ="Aucun utilisateur ne correspond a cette adress mail !"
          break;
        case 'auth/weak-password':
            messageTxt ="Le mot de passe est trop court !"
        default:
          messageTxt ="Erreur incconnue";
          console.log(errorCode);
      }
      Swal.fire({
        title: 'Oops...Something went wrong!',
        text: messageTxt,
        icon: 'error',
        confirmButtonText: 'Okay',
      });

}
export const signOut = () =>{
 return async(dispatch) =>{
    await authRef
    .signOut()
    .then(() => {
      localStorage.removeItem('user');
      dispatch({type: SIGNOUT_SUCCESS, payload: []})
    })
    .catch(error => {
      Swal.fire({
        title: 'Oops...Something went wrong!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    });
 }
};