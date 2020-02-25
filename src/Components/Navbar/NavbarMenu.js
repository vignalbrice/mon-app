import React,{Component} from 'react';
import { Nav, Modal, Navbar, Button, Col, Row, Image, Form, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import logo from '../../Images/movies.png';
import { signOut } from '../../Redux/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fb from '../../Images/facebook.png';
import google from '../../Images/google.png';
import { faHouseDamage, faUserCheck, faQuestion, faUserAlt, faSignOutAlt, faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

class NavbarMenu extends Component {
  constructor(){
    super();
    this.state = {
      isDisplay :'',
      user : [],
      isMobile:'', 
      show: false,
      date:''
    }
    this.signOut = this.signOut.bind(this)
  }
  signOut = (e) =>{
    e.preventDefault();
    if(this.props.data.id !=  undefined){
      this.props.signOut()
    }
  }

  handleClose = () => this.setState({ show :false});
  handleShow = () => this.setState({ show :true});

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.authenticated === false){
      window.location = '/';
    }
    if(nextProps.social_auth === false){
      window.location ='/'
    }
  }
  componentDidMount(){
    window.addEventListener('resize', () => {
      this.setState({
          isMobile: window.innerWidth < 1200
      });
  }, false);
    const date = moment(this.props.data.birthday, "DD-MM-YYYY", 'fr').locale('fr');
    const dateFormat = date.format('DD MMM');
    this.setState({
      date: dateFormat
    })
  }
  
  render(){

    return (<>
      <Navbar className="nav-menu justify-content-between" collapseOnSelect expand="md" sticky="top">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Navbar.Brand href="/Feed"><Image src={logo} className="logo-home"/> FavMovies</Navbar.Brand>
        <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/About" className="about-link">About</Nav.Link>
        <div className="profil"></div>
      </Nav>
    <Link variant="link" to='/Search'><FontAwesomeIcon icon={faSearch} color="#FFF"  size="lg"/> </Link>
    <Nav.Link eventKey="link-3" onClick={() => this.handleShow()}>
          <Image src={this.props.data.photoURL} className="avatar"/>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <p class="h5">
                  <Image src={this.props.data.photoURL} className="avatar-modal"/> {this.props.data.prenom != undefined ? `${this.props.data.nom} ${this.props.data.prenom}` : `${this.props.data.username}`}
                </p>
              </Col>
              <Col md={{ span: 3, offset: 3}}>
                <Button variant="dark" onClick={() => window.location ='/Modify'}>Modifier</Button>
              </Col>
            </Row>
              <br/>
            <div className="card-content">
              <p class="h5">A Propos de moi</p>
              <br/>
              <p className="text-content">{this.props.data.email}</p>
              <p className="text-content">Date de naissance : {this.state.date}</p>
            </div>
            <br/>
            <Button variant="dark" onClick={this.signOut}><FontAwesomeIcon icon={faPowerOff} className="icon-size" /> Déconnexion</Button>
          </Modal.Body>
            <Modal.Footer>
                <p className="lead text-content">Connecté via : {this.props.data.provider === 'facebook.com' ? <img src={fb} className="provider"/> : <img src={google} className="providerG"/>}</p>
            </Modal.Footer>
        </Modal>
        </>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    signOut: () => dispatch(signOut()),
    dispatch
  }
}
const mapStateToProps = state =>{
  return{
    data: state.reducers.data,
    authenticated: state.reducers.authenticated,
    social_auth: state.reducers.social_auth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu)
