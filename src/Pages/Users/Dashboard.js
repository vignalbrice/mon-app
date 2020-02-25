import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import Favoris from './Favoris';
import Parameters from './Parameters';
import Profil from'./Profil';
import AddPost from './AddPost';

class Dashboard extends Component {
  constructor(){
    super();
    this.detail ='';
    this.state = {
      link: '',
    };
  }
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    return (
      <div className="About">
        <div className="header-dashboard">
            <Breadcrumb className="breadcrumb-dash">
              <Breadcrumb.Item href="/Feed">Accueil</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Profil
              </Breadcrumb.Item>
              {this.state.link === 'Paramètres' || this.state.link === 'Favoris' || this.state.link ==='AddPost' ? 
                <Breadcrumb.Item href="#">
                  {this.state.link}
              </Breadcrumb.Item> : ""}
            </Breadcrumb>
            <p class="h2">Profil</p><br/>
            <Nav activeKey="/home" 
                onSelect={selectedKey => this.setState({link: selectedKey})}
                className="nav-dashboard">
            <Nav.Item>
              <Nav.Link eventKey="Profil" className={this.state.link ==='Profil' && 'active'}>Profil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Paramètres" className={this.state.link === 'Paramètres' && 'active'}>Paramètres</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Favoris" className={this.state.link === 'Favoris' && 'active'}>Favoris</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="AddPost" className={this.state.link === 'AddPost' && 'active'}>Ajouter un Post</Nav.Link>
            </Nav.Item>
          </Nav>
         </div>
         {this.state.link ==='' && <Profil historyPush={this.props.history}/>
          || this.state.link ==='Profil' && <Profil/> 
          || this.state.link ==='Paramètres' && <Parameters/>
          || this.state.link ==='Favoris' && <Favoris history={this.props.history}/>
          || this.state.link ==='AddPost' && <AddPost/>}
      </div>
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
export default connect(mapStateToProps)(Dashboard);
