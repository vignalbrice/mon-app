import React,{Component} from 'react';
import '../../Css/App.css';
import { getBestFilmsFromApi, getImageFromApi } from'../../API/API';
import { Container, Card, Row, Col, Button, FormControl } from 'react-bootstrap';
import NavbarMenu from '../../Components/Navbar/NavbarMenu';
import FilterBar from '../../Components/FilterBar/FilterBar';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import loading from '../../Images/loading.gif'
class Feed extends Component {
  constructor(){
    super();
    this.page = 0;
    this.totalPage = 0;
    this.state = {
      films : [],
      isLoading: false,
      hasMore:''
    };
    this.getBestFilms = this.getBestFilms.bind(this);
    this.truncate = this.truncate.bind(this);
  }
  componentDidMount(){  
    this.getBestFilms();
  }
  getBestFilms = () =>{
    this.setState({ isLoading: true})
    getBestFilmsFromApi(this.page + 1).then(data =>{
      console.log(data)
      this.page = data.page;
      this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: true
        })
    })
  } 
  truncate = (str)  =>{
    return str.length > 10 ? str.substring(0, 110) + "..." : str;
}
  render(){
    return (
      <div className="Feed">
      <NavbarMenu/>
      <FilterBar/>
      <Container fluid>
      <Row>
        <InfiniteScroll
          dataLength={this.state.films.length}
          next={this.getBestFilms}
          hasMore={this.state.isLoading}
          loader={<img src={loading} className="loading" />}
          endMessage={
            <p style={{ textAlign: "center"}}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {this.state.films.map((item, index) => 
              {
          return  (<Col md={{ span: 8, offset: 3 }}>
                      <a className="link-card" onClick={() => this.props.history.push({pathname: `/Detail/${item.id}`})}>
                        <Card className="flex-row card-feed" key={index}>
                          <Card.Img variant="left" src={getImageFromApi(item.backdrop_path)} className="img-card" fluid/>
                          <Col>
                            <Card.Body>
                              <Card.Title>{item.title}</Card.Title>
                              <Card.Text className="overview">{this.truncate(item.overview)}</Card.Text>
                            </Card.Body>
                            </Col>
                        </Card>
                      </a> 
                    </Col>)
              })
          }
          </InfiniteScroll>
          </Row>
          </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}
const mapStateToProps = state => {
  return{
    data: state.reducers.data,
    authenticated: state.reducers.authenticated
  }
}
export default connect(mapStateToProps)(Feed);
