import React,{Component} from 'react';
import { Col, Card, Jumbotron, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faPlusCircle, faHeading } from '@fortawesome/free-solid-svg-icons';
import { fetchUserPost, deleteUserPost } from '../../Redux/actions/authActions';
import * as firebase from "firebase";
import "firebase/auth";

class MyPosts extends Component {
    constructor(){
        super();
        this.state = {
          title: '',
          desc:'',
          chaine: 120,
          file : null,
          imagePreviewUrl: "http://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/256/Preview-icon.png"
        };
      }
      componentDidMount(){
        this.props.fetchUserPost()
      }
      deletePostById(id){
        this.props.deleteUserPost(id)
      }
  render(){
    return (
      <Container>
      <Col md={12}>
        <br/>
        <p className="text-content">Posts Récents</p>
        {this.props.posts && this.props.posts.map(posts =>(
          <Col md={4}>
            <Card className="card-posts">
              <Col md={2}>
                <img src={posts.img}/>
                </Col>
              <Card.Body>
                <h1>{posts.title}</h1>
                <p>{posts.desc}</p>
              </Card.Body>
              <Card.Footer>
                <a className="delete-link" onClick={() => this.deletePostById(posts.id)}>
                  Delete Post
                </a>
              </Card.Footer>
            </Card>
            </Col>
        ))}
      </Col>
    </Container>
    );
  }
}

const mapStateToProps = state =>{
    return{
      posts: state.reducers.posts
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchUserPost : () => dispatch(fetchUserPost()),
        deleteUserPost :  (id) => dispatch(deleteUserPost(id)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
