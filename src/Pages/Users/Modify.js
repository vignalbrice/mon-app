import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faPlus, faUserAlt, faFrown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import countries from'../../API/countries.json';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ModifyProfil extends Component {
  constructor(){
    super();
    this.state = {
      chaine: 140,
      tel: '',
      nom: ''
    }
  }
  calculateString = (string) =>{
      this.setState({
        chaine: 140 - string.trim().length 
      })
  }
  render(){
    return (
      <div className="Modify">
      <div className="header-dashboard">
          <Breadcrumb className="breadcrumb-dash">
            <Breadcrumb.Item href="/Feed">Accueil</Breadcrumb.Item>
            <Breadcrumb.Item href="/Dashboard">
              Profil
            </Breadcrumb.Item>
              <Breadcrumb.Item href="#">
               Modifier
            </Breadcrumb.Item>
          </Breadcrumb>
          <p class="h2">Modification de mon profil</p><br/>
       </div>
        <Container>
          <br/>
          <Col md={12} className="modify-content">
              <Row>
                <Col md={2}>
                  <Image src={this.props.data.photoURL} className="avatar-dashboard"/>
                </Col>
                <Col md={10}>
                  <p className="title-content">Pseudo</p>
                  <FormControl value={this.props.data.prenom != undefined ? `${this.props.data.nom} ${this.props.data.prenom}` : `${this.props.data.username}`}/>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                </Col>
                <Col md={10}>
                  <p className="title-content">Mini biographie</p>
                    <FormControl as="textarea" 
                    rows="3"
                    onChange={e => this.calculateString(e.target.value)}/>
                  <p className="text-content text-right">Caractères restants : {this.state.chaine}</p>
                </Col>
              </Row>
              <Row>
              <Col md={4}>
                    <p className="title-content">À propos de moi</p>
              </Col>
              </Row>
              <Row>
              <Col md={6}>
                    <p className="text-content">Prénom</p>
                    <FormControl value={this.props.data.prenom}/>
                </Col>
                <Col md={6}>
                    <p className="text-content">Nom</p>
                    <FormControl 
                      defaultValue={this.props.data.nom}
                      onChange={(text) => this.setState({nom: text})}/>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                    <p className="text-content">Sexe</p>
                    <select className="form-control">
                      <option>M</option>
                      <option>F</option>
                    </select>                
                </Col>
                <Col md={6}>
                    <p className="text-content">Date de naissance</p>
                    <FormControl value={this.props.data.birthday} disabled/>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                    <p className="text-content">Pays</p>
                    <select className="form-control">
                      {countries.map((countries,index) =>{
                      return (<option>{countries.AF}</option>)
                      })}
                    </select>                
                </Col>
                <Col md={6}>
                    <p className="text-content">Téléphone</p>
                    <FormControl  
                      defaultValue={this.props.data.tel}
                      />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col md={5}></Col>
                  <Col md={7}>
                    <Button variant="dark">Enregistrer</Button>
                  </Col>
              </Row>
              <br/>
          </Col>
        </Container>
        </div>);
  }
}
const mapDispatchToProps = dispatch =>{
  return{
  }
}
const mapStateToProps = state =>{
  return{
    data: state.reducers.data,
    authenticated: state.reducers.authenticated,
    social_auth: state.reducers.social_auth
  }
}
export default connect(mapStateToProps)(ModifyProfil);
