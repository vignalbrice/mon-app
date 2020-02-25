import React,{Component} from 'react';
import { NavbarBrand, Navbar, Image } from 'react-bootstrap';
import '../Css/App.css';

class NotFound extends Component {

  render(){
    return (
      <div className="NotFound">
          <h1>Error 404 : NotFound</h1>
      </div>
    );
  }
}


export default NotFound;
