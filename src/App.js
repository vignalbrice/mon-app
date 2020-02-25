import React, {Component} from 'react';
import logo from '../src/Images/movies.png';
import './Css/App.css';
import { Image, Form, FormGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';
import { signIn, signWithSocial } from './Redux/actions/authActions';
import * as firebase from 'firebase';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      email:"",
      password: "",
      nom:"",
      prenom:"",
      isSignUpShow:  false
    }
    this.showSignUp = this.showSignUp.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  showSignIn = () =>{
    this.setState({ isSignUpShow : true});
  }
  showSignUp = () =>{
    this.setState({ isSignUpShow : false});
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.signIn(this.state.email, this.state.password, this.props.history)
  }
  handleGoogleAuth = (e) =>{
    e.preventDefault();
    let google = 'google';
    this.props.signWithSocial(this.props.history,google);
  }
  handleFacebookAuth = (e) =>{
    e.preventDefault();
    let google = '';
    this.props.signWithSocial(this.props.history,google);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user && this.props.authenticated === true) {
        // User is signed in.
        this.props.history.push('/Feed')

      } else {
        // No user is signed in.
        this.props.history.push('/')
      }
    });
  }
  render(){

    return (
      <div className="App">
        <div className="logo">
          <Image src={logo} className="App-logo"/>
            <h1>FavMovies</h1>
        </div>
        {!this.state.isSignUpShow ? <Form onSubmit={this.handleSubmit} className="Form-Modal-Connect">
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faEnvelope} className="form-control-feedback" color="#333" />
              <FormControl 
                type="email" name="email" id="Email-ModalConnect" placeholder="Email" 
                onChange={(e) => this.setState({ email : e.target.value }) }
              />
            </FormGroup>
            <FormGroup className="has-password-connect">
              <FontAwesomeIcon icon={faKey} className="form-control-feedback" color="#333"/>
              <FormControl
                type="password" name="password" id="Password-ModalConnect" placeholder="Password" 
                onChange={ (e) => this.setState({ password : e.target.value }) }
                />
            </FormGroup>
            <Button onClick={this.handleSubmit} variant="outline-primary" size="lg" block> Login</Button>
            <Button onClick={this.handleGoogleAuth} variant="outline-default" className="google-btn" size="lg" block><FontAwesomeIcon icon={faGoogle} /> Se connecter avec Google</Button>
            <Button onClick={this.handleFacebookAuth} variant="outline-default" className="facebook-btn" size="lg" block><FontAwesomeIcon icon={faFacebook} /> Se connecter avec Facebook</Button><br/>
            <p className="Forgotten-pwd"><a href="#">Forgotten password ?</a></p>
                <hr style={{ backgroundColor:'white'}}/>
              <p className="Footer-modal">You don't have an account ? <a href="#" onClick={() => this.showSignIn()}>Sign Up</a></p>
          </Form> : <Form onSubmit={this.handleSubmit} className="Form-Modal-Connect">
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faUser} className="form-control-feedback"  color="#333"/>
              <FormControl 
                type="text" name="nom" placeholder="Nom" 
                id="Nom-ModalConnect" 
                onChange={ this.handleInputChange }
                value={ this.state.nom }
              />
            </FormGroup>
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faUserAlt} className="form-control-feedback"  color="#333"/>
              <FormControl 
                type="text" name="prenom" placeholder="Prenom"
                id="Prenom-ModalConnect"  
                onChange={ this.handleInputChange }
                value={ this.state.prenom }
              />
            </FormGroup>
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faEnvelope} className="form-control-feedback" color="#333"/>
              <FormControl 
                type="email" name="email" id="Email-ModalConnect" placeholder="Email" 
                onChange={ this.handleInputChange }
                value={ this.state.email }
              />
            </FormGroup>
            <FormGroup className="has-password-connect">
              <FontAwesomeIcon icon={faKey} className="form-control-feedback"  color="#333"/>
              <FormControl
                type="password" name="password" id="Password-ModalConnect" placeholder="Password" 
                onChange={ this.handleSubmit }
                value={ this.state.password }
                />
            </FormGroup>
            <Button variant="outline-primary" size="lg" block> SignIn</Button>
                <hr style={{ backgroundColor:'white'}}/>
              <p className="Footer-modal">You have an account ? <a href="#" onClick={() => this.showSignUp()}>Sign In</a></p>
          </Form>}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
 return {
  signIn : (email,password,history) => dispatch(signIn(email,password,history)),
  signWithSocial : (history,google) => dispatch(signWithSocial(history,google)),
  dispatch
 }
}
const mapStateToProps = state =>{
  return {
    user : state.reducers.data,
    authenticated: state.reducers.authenticated,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
