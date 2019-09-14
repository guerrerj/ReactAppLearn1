import React, {Component} from 'react';
import { Card, CardImg,  CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Label, Input, Col, Row } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Modal, ModalHeader} from 'react-modal'; 

const maxLength = (len) => (val) => !(val) || (val.length <= len); //ensures length is less than value
const minLength = (len) =>(val) =>  (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props); 

        this.state = {
            modal: false
        }
        this.toggleModal = this.toggleModal.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values){
        console.log("Current State is : " + JSON.stringify(values))
        alert("Current State is : " + JSON.stringify(values))
      }

    toggleModal (){
        this.setState(prevState => ({modal: !prevState.modal}));
    }

 

    render(){
        return(
            <div>
                <Button 
                    onClick={this.toggleModal}
                    type="submit" 
                    color="primary">
                    Submit Comment 
                </Button>
                <Modal  isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                       <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>                          
                          <Row className="form-group">
                              <Label htmlFor="rating" md={2}>Rating</Label>
                                 <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="1"
                                        className = "form-control"
                                        validators={{
                                        minLength: minLength(3), maxLength:maxLength(15)
                                        }}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                    <Errors 
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be less than 15 characters '
                                    }}/>
                                  </Col>
                           </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className = "form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength:maxLength(15)
                                        }}/>
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be less than 15 characters '
                                        }}/>
                                </Col>
                           </Row>           
             
                            <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>  
                                <Col md={10}>
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment"
                                        className = "form-control" 
                                        rows="6"/>
                                </Col>                            
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button 
                                        type="submit" 
                                        color="primary">
                                        Submit 
                                    </Button>
                                </Col>
                            </Row>
                       </LocalForm> 
                 </Modal>
            </div>
        );
    }
}

function RenderDish({dish}){
    return(
        <div>
        <Card>
            <CardImg top src={dish.image} alt={dish.name}/>                   
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );}

function RenderComments({comments})
    {//This object destructuring 
        const comm = comments.map((com) => {
                return (<CardText>{com.comment} {com.author} {com.rating} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</CardText>); 
            }); 

        return (
            <div className ="col-12">
                <h4>Comments</h4>
                <Card>
                <CardBody>
                {comm}
                </CardBody>
                </Card>       

            </div>
    );}

//Container is used to create boxed content
// Comments are coming separately now 
const DishDetail = (props) => {
    if (props.dish != null){   
        return( 
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>  
                </Breadcrumb>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <h3>{props.dish.name}</h3>
                    <RenderDish dish={props.dish}/>
                    <hr/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}/>    
                </div>
            </div>
        </div>
        );
    }
    else return(<div></div>);
}

export default DishDetail;

    