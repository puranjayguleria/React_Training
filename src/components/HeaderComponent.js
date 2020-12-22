import React,{Component} from 'react';
import {Navbar, NavbarBrand, Jumbotron, Nav,NavbarToggler,NavItem,Collapse, timeoutsShape,
Button,Modal,ModalHeader,ModalBody, FormGroup,Form,Input,Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            isNavOpen:false,
            isModalOpen:false // track the state whether the modal is open or not(login Form)
        }
        this.toggleNav=this.toggleNav.bind(this); // This is done so that the function toggleNav can be used inside JSX.
        this.toggleModal=this.toggleModal.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    handleLogin(event){
            this.toggleModal();
            alert("Username:" + this.username.value + "Password: " + this.password.value + "RememberMe "+this.remember.checked )
            event.preventDefault(); // add references to the form ..This is uncontrolled form the login one here
        }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    render(){
        return(
            <> {/**React fragment to group elements */}
            <Navbar dark expand="md"> {/**Only expand when medium or large */}
            <div className="container">
                <NavbarToggler onClick={this.toggleNav}/>{/**for toggling collpase when on small screens, wont show for large screens */}
                <NavbarBrand className="mr-auto"href="/">
                    <img src="assets/images/logo.png" height="30" width="41" alt="con Fusion"/>
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>{/**Collapse if screen size small */}

                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home">
                            <span className="fa fa-home fa-lg"></span>Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">
                            <span className="fa fa-info fa-lg"></span>About Us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/menu">
                            <span className="fa fa-list fa-lg"></span>Menu
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus">
                            <span className="fa fa-address-card fa-lg"></span>Contact Us
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg">Login</span>
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
                            <h1>Confusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Login</ModalHeader>
                <ModalBody >
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                            innerRef={(input)=> this.username=input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                            innerRef={(input)=> this.password=input}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input)=> this.remember=input}/>
                                Remember me!
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">
                            Login
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
            </>
        )
    }
}
export default Header;