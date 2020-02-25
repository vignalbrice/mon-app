import React,{Component} from 'react';
import { Breadcrumb, Col, Image, Container, Row, Button } from 'react-bootstrap';
import '../../Css/App.css';
import { getFilmDetails, getImageFromApi } from '../../API/API';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
//import heart from'../../Components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
class DetailFilm extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(){
    super();
    this.detail ='';
    this.state = {
      detail : [],
      id: '',
      like: false,
      active: ''
    };
    this.getDetail = this.getDetail.bind(this);
    this.addActiveClass = this.addActiveClass.bind(this);
  }
  
  componentDidMount(){
    this.getDetail();
  }
  getDetail = () =>{
    getFilmDetails(this.props.match.params.id).then(data =>{
        this.setState({
          detail: [data]
        })
    })
  }
  addActiveClass(e){
    console.log(e.target.id)
    const clicked = e.target
    if(this.state.active === clicked) { 
        this.setState({active: '',
                       like : true})
    } else {
        this.setState({active: clicked,
                       like: false })
   }
}
  render(){
    //console.log(this.state.active);
    return (
      <div className="About">
        <div className="header-dashboard">
          <Breadcrumb className="breadcrumb-dash">
            <Breadcrumb.Item href="/Feed">Accueil</Breadcrumb.Item>
            <Breadcrumb.Item href="#">
              Détails
            </Breadcrumb.Item>
          </Breadcrumb>
          <p class="h2">Détails du film</p><br/>
       </div>
        <Container>
        {/*<Link to='/Feed' className="backArrow"><FontAwesomeIcon icon={faArrowLeft} color='#333'/></Link>*/}
         {this.state.detail.map((item,index) => {
           return (<>
                  <Row>
                    <Col md="4" lg="4" className="poster">
                      {item.homepage != "" || undefined ? <a href={item.homepage} target="_blank">
                        <Image src={getImageFromApi(item.poster_path)} key={index} className="img-detail" />
                      </a> : <Image src={getImageFromApi(item.poster_path)} key={index} className="img-detail" />}
                    </Col>
                    <Col md="8" lg="8">
                      <p className="display-4">{item.title}({moment(item.release_date).locale('fr').format('YYYY')})</p>
                      {item.tagline != "" && <p className="lead tagline"><i>"{item.tagline}"</i></p>}
                      <div className="desc"><p class="h3">Description </p>{item.overview}</div>
                      <p class="h3 gendertxt">Genres </p>
                      <Row className="gdr-all">
                        {item.genres.map(gender =>{
                          return <div className="gender">
                          {gender.name}
                          </div>
                        })}
                        {this.state.like === true ? 
                          <div onClick={(e) => this.addActiveClass(e)} variant="link" className={`like ${this.state.active === "" && ''}`} name="unlikebtn">
                              <FontAwesomeIcon icon={faHeart} color="#c0392b" size="2x"/>
                          </div> : 
                          <div onClick={(e) => this.addActiveClass(e)} variant="link" className={`like heart-blast`} id="likebtn">
                              <FontAwesomeIcon icon={faHeart} color="#333" size="2x"/>
                          </div>}
                      </Row>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col md lg={6}>
                      <p class="h3">Productions</p>
                      <div className="prdct-all">
                        {item.production_companies.map(companies =>{
                          return (<>
                            {companies.logo_path != undefined && <img src={getImageFromApi(companies.logo_path)} className="productions" title={companies.name}/>}
                            </>)
                        })}
                      </div>
                    </Col>
                    <Col md lg={6}>
                      <p class="h3">Votes</p>
                      <StarRatings
                        rating={item.vote_average/2}
                        starRatedColor="#f1c40f"
                        //changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                      />
                      <p class="lead">Vous avez été <b>{item.vote_count}</b> a voté !</p>
                    </Col>
                  </Row>
                  </>)
         })}
        </Container>
      </div>
    );
  }
}

//const DashboardWithRouter = withRouter(Dashboard);
export default DetailFilm;