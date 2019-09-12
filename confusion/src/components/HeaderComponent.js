import React, {Component} from 'react';
import {Navbar, NavbarBrand, Jumbotron} from 'reactstrap';

class Header extends Component{
    render(){ //shortcut for react fragment, ensures use div to enclose, dont add node 
        return(
            <>
            <Navbar dark>
            <div className="container">
                <NavbarBrand href="/">Jose's Confusion</NavbarBrand>
            </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Jose Confusion</h1>
                            <p> Catering to all engineers and enthusiasts. No need to look any further for the right stuff!</p>
                        </div>
                    </div>
                </div>    
            </Jumbotron>>

            </>
        );
    }
}

export default Header; 