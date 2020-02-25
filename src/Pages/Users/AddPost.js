import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faPlusCircle, faHeading } from '@fortawesome/free-solid-svg-icons';
import { uploadPostPhoto } from '../../Redux/actions/authActions';
import * as firebase from "firebase";
import "firebase/auth";
import MyPosts from './MyPosts';

class AddPost extends Component {
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
      }
      calculateString = (string) =>{
        this.setState({
          chaine: 120 - string.trim().length,
          desc: string 
        })
      };
      photoUpload (e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
      uploadPost = () =>{
        if(this.state.title === ''){
            this.setState({ errorTitle : true})
        }
        if(this.state.desc === ''){
            this.setState({ errorDesc : true})
        }
        if(this.state.imagePath === undefined || this.state.imagePath === ''){
            this.setState({ errorImg : true})
        }
        /*if(this.state.errorTitle === false &&
             this.state.errorImg === false && 
                this.state.errorDesc === false){*/
                    this.props.uploadPostPhoto(this.state.file, this.state.title, this.state.desc)
            //}
      }
  render(){
    return (
      <Container>
      <Col md={12}>
        <br/>
        <p class="title-content">Mes Posts</p>
          <br/>
          <Col md={12}>
          <Col md={4}>
            <label for="photo-upload" className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                    <img for="photo-upload" src={this.state.imagePreviewUrl}/>
                </div>
                <input id="photo-upload" type="file" onChange={(e) => this.photoUpload(e)}/> 
            </label>
          </Col>
          <Col md={2}>
            <p className="text-content">Titre</p>
          </Col>
          <Col md={4}>
            <FormGroup className="has-email-connect">
              <FontAwesomeIcon icon={faHeading} className="form-control-feedback" color="#333" />
              <FormControl 
                type="text" name="title" id="Email-ModalConnect" placeholder="Titre du post" 
                onChange={e =>this.setState({title : e.target.value})}/>
            </FormGroup> 
            </Col>
            <Col md={10}>
                  <p className="text-content">Description du post</p>
                    <FormControl as="textarea" 
                    rows="3"
                    onChange={e => this.calculateString(e.target.value)}/>
                  <p className="text-content text-right">Caractères restants : {this.state.chaine}</p>
                </Col>
            <Button variant="secondary" onClick={() =>this.uploadPost()}>Ajouter un Post</Button>
            <br/>
          </Col>
      </Col>
      <MyPosts/>
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
const mapDispatchToProps = dispatch =>{
    return{
        uploadPostPhoto : (file, title, desc) => dispatch(uploadPostPhoto(file, title, desc)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
