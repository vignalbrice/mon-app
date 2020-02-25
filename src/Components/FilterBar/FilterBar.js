import React,{Component} from 'react';
import { Nav, Modal, NavItem, Button, Col, Row, Image } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { signOut } from '../../Redux/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseDamage, faUserCheck, faQuestion, faUserAlt, faSignOutAlt, faFilm } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { getMoviesGender } from'../../API/API';
import { Link } from 'react-router-dom';

class NavbarMenu extends Component {
  constructor(){
    super();
    this.state = {
      isDisplay :'',
      gender : [],
      isMobile:'', 
      isFilter: false,
      isLoading: false,
      genderSelected: ''
    }
  }
  componentDidMount(){
    getMoviesGender().then(data =>{
      this.setState({
        gender : [this.state.gender,...data.genres]
      })
    })
  }
  render(){
    return (<div className="filter">
    <Col md={3}>
      <Nav className={'flex-column sidebar'}>
        <p className="h2 ml-3">Filtres</p><br/>
        <Link className="ml-3 link-filter">Meilleurs films</Link>
        <Link className="ml-3 link-filter">Derniers films en salle</Link>
        <Link className="ml-3 link-filter">Films à venir</Link><br/>
        <p className="ml-3 h4">Trier par :</p>
        <br/>
        {this.state.isFilter === false ? 
        <Link className="ml-3 link-filter" onClick={() => this.setState({ isFilter: true })}>+ Genres</Link> :
        <Link className="ml-3 link-filter" onClick={() => this.setState({ isFilter: false })}>- Genres</Link>
        }
       {this.state.isFilter === true && 
       <div className="ml-3 filtergender">
       {this.state.gender.map((item, index) => 
                        <div key={String(index)} className="ml-3 link-filter">
                            <Link 
                                key={String(index)} 
                                variant="link"
                                style={{backgroundColor: this.state.genderSelected === item.id ? '#333' : '#FFF'}}
                                onPress={() => this._getMoviesByGender(item.id)}>
                                    <p style={{color:this.state.genderSelected === item.id ? '#FFF' : '#333', fontFamily:'OpenSans-Regular'}}>{item.name}</p>
                            </Link> 
                        </div>   
                    )}        
        </div>}
        <Link className="ml-3 link-filter">Date de sortie</Link>
        <Link className="ml-3 link-filter">Titre de films</Link>
      </Nav>
    </Col>
        </div>
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
