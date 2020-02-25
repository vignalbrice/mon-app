import React,{Component} from 'react';
import { Col, Nav, Image, Container, Breadcrumb, Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import '../../Css/App.css';
import { connect } from'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


class Favoris extends Component {
  render(){
    return (
      <Container>
      <Col md={12}>
        <br/>
        <p class="title-content">Ma liste de films</p>
          <br/>
          <p className="lead text-content grey-content"><FontAwesomeIcon icon={faFrown} size={64}/> Oopss..vous n'avez pas encore de films en liste</p>
          <Col md={12}>
            <Button variant="secondary" onClick={() =>this.props.history.push('/Feed')}><FontAwesomeIcon icon={faPlusCircle} /> Ajouter des films</Button>
          </Col>
      </Col>
    </Container>
    );
  }
}

export default Favoris;
