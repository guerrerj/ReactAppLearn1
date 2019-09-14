import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,
     NavItem, Jumbotron, Button, ModalHeader, Modal, 
     Form, FormGroup, Input, Label, ModalBody} from 'reactstrap';
import {NavLink} from 'react-router-dom';
// Navlink adds a tag and active if url matches 

class Header extends Component{ //to collapse for small screen sizes use react strap component small
    
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false, // New property for the state, toggle whenever navbar is clicked
            isModalOpen: false

        }
        this.toggleNav = this.toggleNav.bind(this); // Can use an arrow function or can bind to this 
        this.toggleModal = this.toggleModal.bind(this); // Can use an arrow function or can bind to this 
        this.handleLogin = this.handleLogin.bind(this); // Can use an arrow function or can bind to this 

    }
    
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + "Password: " + this.password.value+ "Remember: " + this.remember.checked);
        event.preventDefault(); 
    }
    render(){ //shortcut for react fragment, ensures use div to enclose, dont add node 
        // NavbarToggler adds a button for small sizes
        return(
            <>
            <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav}/>
                <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" height="30" width="41" 
                alt="Le Confusion"/>
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home">
                            <span className="fa fa-home fa-lg"></span> Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">
                            <span className="fa fa-info fa-lg"></span> About Us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/menu">
                            <span className="fa fa-list fa-lg"></span> Menu
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus">
                            <span className="fa fa-address-card fa-lg"></span> Contact Us
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg">
                                Login
                            </span>
                        </Button>
                    </NavItem>
                </Nav>
                </Collapse>
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" 
                                innerRef={(input)=>this.username = input} name="username"/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" 
                                innerRef={(password)=> this.password = password} name="password"/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={(rem)=> this.remember = rem}>
                                        Remember me
                                    </Input>
                                    <Button type="submit" value="submit" color="primary">Login</Button>
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
// Modal will be controlled by react component
// ml-auto pushes to right edge 
// need form references to get the value
export default Header; 