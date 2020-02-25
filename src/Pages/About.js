import React,{Component} from 'react';
import { Image, Carousel, Container, Row, Col } from 'react-bootstrap';
import '../Css/App.css';
import earth from'../Images/EARTH.gif';
import NavbarMenu from'../Components/Navbar/NavbarMenu';

class About extends Component {

  constructor(){
    super();
    this.detail ='';
    this.state = {
      detail : [],
      id: ''
    };
  }
  
  componentDidMount(){
  }
  render(){
    console.log(this.state.detail);
    const date = new Date;
    return (
      <div className="About">
        <NavbarMenu/>
        <Container>
          <Row>
            <Col md={12}>
              <br/>
              <Row>
                <Col md={2}></Col>
                <Col md={4}>
                  <img src={earth} className="img-about center-block"/>
                </Col>
                <Col md={4}></Col>
              </Row>
              <Row>
                <Col md ={12}>
                  <p className="text-center text-content">A propos de @FavMovies</p>
                  <div class="grey-content">
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus
                      ui blanditiis praesentium voluptatum deleniti atque corrupti
                      quos dolores et quas molestias excepturi sint occaecati cupiditate 
                      non provident, similique sunt in culpa qui officia deserunt mollitia animi,
                     id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
