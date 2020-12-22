import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Navbar, NavbarBrand, Jumbotron, Nav,NavbarToggler,NavItem,Collapse, timeoutsShape, FormGroup,Form,Input} from 'reactstrap';
import { Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody,
        Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent'
    function RenderComments({comments,addComment,dishId}){
       
        if(comments==null){
            return(
                <div></div>
            )
        }

        
            
            return(
                <div>
                {comments.map((tcomment)=>{
                    return(
                <ul className="list-unstyled">
                    <li>{tcomment.comment}</li>
            <li> --{tcomment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(tcomment.date)))}</li>
                </ul>
                )})}
        <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
                </div>
            );
    
        

    }
    
    
    const Dishdetail= (props)=>{
        const dish=props.dishDetail
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(dish==null){
            return(
                <div></div>
            )
        }
        else{
        return(
        <div className="container">
            <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/" active="true">{props.dishDetail.name}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to='/menu' >Menu</Link>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dishDetail.name}</h3>
                            <hr/>
                        </div>
                    </div>
        <div className="row">
        <div className="col-12 col-md-5 m-1">
        <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
        <CardTitle >{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
        </CardBody>
        </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
        
        <h4>Comments</h4>
        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dishDetail.id}
        />
        </div>
        
        </div>
          
        </div>
        )
        }
    }

    const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isModelOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.hadnleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }

    hadnleSubmit(values) {

        this.toggleModal();

        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.hadnleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should have more than 3 Characters',
                                        maxLength: 'Should have 15 or less Characters'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                <Col md={12}>
                                <Control.text model=".comment" id="comment" name="comment" 
                                    resize="none"
                                    rows="12" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                    }} 
                                />
                                <Errors className="text-danger" model=".comment" show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}



export default Dishdetail;