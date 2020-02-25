import React, { Component } from 'react';
import NavbarMenu from '../../Components/Navbar/NavbarMenu';

class Search extends Component {
    state = {  }
    render() { 
        return (<div className="Search">
                    <NavbarMenu/>
                    <p className="lead">Search Component</p>
                </div>);
    }
}
 
export default Search;