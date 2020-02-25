import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faPlus, faUserAlt, faFrown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import moment from 'moment';
import { Link } from 'react-router-dom';

class Profil extends Component {

    constructor(){
        super();
        this.state = {
          email: '',
          password: '',
          passwordrepeat: ''
        };
      }  
  render(){
    return (
        <Container>
          <br/>
          <Col md={{ span:3, offset: 10}}>
              <Button variant="dark" onClick={() => this.props.historyPush.push({pathname: '/Modify'})}>Modifier</Button>
          </Col>
          <br/>
          <Col md={11.5}>
            <div className="card-content">
              <p class="username">
                <Image src={this.props.data.photoURL} className="avatar-dashboard"/> {this.props.data.prenom != undefined ? ` @${this.props.data.nom} ${this.props.data.prenom}` : ` @${this.props.data.username}`}
              </p>
            </div>
              <br/>
            <div className="card-content">
            <p class="title-content">
              À propos de moi
            </p>
              <p class="text-content">{this.props.data.prenom != undefined ? `${this.props.data.nom} ${this.props.data.prenom}` : `${this.props.data.username}`}</p>
              <p class="text-content">Date de naissance : {this.props.data.birthday}</p>
            </div>
              <br/>
            <div className="card-content">
            <p class="title-content">
              Informations sur le compte
            </p>
              <p class="text-content">Date d'inscription: {moment(this.props.data.registered.seconds * 1000).lang('fr').format('DD MMMM YYYY')}</p>
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
export default connect(mapStateToProps)(Profil);
