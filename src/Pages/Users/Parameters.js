import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faPlus, faUserAlt, faFrown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import { Link } from 'react-router-dom';
class Parameters extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      passwordrepeat: ''
    };
  }
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    return (
      <Container>
      <br/>
      <Col md={12}>
      <div className="">
        <p className="title-content">Votre email</p>
        <Col md={12}>
        <Row>
        <Col md={2}>
          <p className="text-content">Adresse e-mail actuelle </p>
        </Col>
          <Col md={4}>
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faEnvelope} className="form-control-feedback" color="#333" />
              <FormControl 
                type="email" name="email" id="Email-ModalConnect" placeholder="Email" 
                value={this.props.data.email}
                disabled
              />
            </FormGroup> 
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <p className="text-content">Nouvelle e-mail</p>
          </Col>
          <Col md={4}>
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faEnvelope} className="form-control-feedback" color="#333" />
              <FormControl 
                type="email" name="email" id="Email-ModalConnect" placeholder="Email" 
                onChange={e =>this.setState({email : e.target.value})}
              />
            </FormGroup> 
            </Col>
        </Row>
        <Col md={{span:1, offset:4}} >
          <Button variant="primary" className="send-dashboard">Envoyer</Button>
        </Col>
        <Row>
            <p className="title-content">Votre langue</p>
        </Row>
        <Row>
          <Col md={4}>
              <select className="select-dashboard">
                <option>Français</option>
                <option>Anglais</option>
              </select>
          </Col>
        </Row>
        <Col md={{span:1, offset:4}} >
          <Button variant="primary" className="send-dashboard">Envoyer</Button>
        </Col>
        <Row>
          <Col md={12} className="grey-content">
            <Col md={8}>
              <p className="title-content">Changer votre mot de passe</p>
              <p className="text-content">Nouveau mot de passe</p>
            </Col>
            <Col md={6}>
            <FormGroup className="has-password-connect">
              <FontAwesomeIcon icon={faKey} className="form-control-feedback" color="#333"/>
              <FormControl
                type="password" name="password" id="Password-ModalConnect" placeholder="Password"
                onChange={ (e) => this.setState({ password : e.target.value }) }
                />
            </FormGroup>
            </Col>
            <Col md={8}>
            <p className="text-content">Retapez à nouveau votre mot de passe</p>
            </Col>
            <Col md={6}>
            <FormGroup className="has-password-connect">
              <FontAwesomeIcon icon={faKey} className="form-control-feedback" color="#333"/>
              <FormControl
                type="password" name="password" id="Password-ModalConnect" placeholder="Password"
                onChange={ (e) => this.setState({ passwordrepeat : e.target.value }) }
                />
            </FormGroup>
            </Col>
            <Col md={{span:1, offset:4}} >
              <Button variant="primary" className="send-dashboard">Envoyer</Button>
            </Col>
          </Col>
        </Row>
        <Row>
        <Col md={12} className="grey-content">
          <Col md={6}>
            <p className="title-content">Supprimer mon compte</p>
            <Link className="link-delete">Je veux supprimer mon compte</Link>
          </Col>
        </Col>
        </Row>
        </Col>
      </div>
      </Col>
    </Container>
    );
  }
}

const mapStateToProps = state =>{
  return{
    data: state.reducers.data,
    authenticated: state.reducers.authenticated,
    social_auth: state.reducers.social_auth
  }
}
export default connect(mapStateToProps)(Parameters);
