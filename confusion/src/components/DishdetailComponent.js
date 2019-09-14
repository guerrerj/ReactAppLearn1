import React, {Component} from 'react';
import { Card, CardImg,  CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent'; 

const maxLength = (len) => (val) => !(val) || (val.length <= len); //ensures length is less than value
const minLength = (len) =>(val) =>  (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props); 

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values){
        this.toggleModal(); 
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      }

    toggleModal (){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    } 

    render(){
        return(
            <> 
            <Button outline onClick={this.toggleModal}>Add Comment</Button>
            <Modal show={this.isModalOpen} isOpen={this.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader closeButton toggle={this.toggleModal}>
             Submit Comment
            </ModalHeader>
             <ModalBody>
             <Row className="form-group">
                               <Col>
                                <Label htmlFor="name">Your Name</Label>
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
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>  
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment"
                                        className = "form-control" 
                                        rows="6"/>
                                </Col>                            
                            </Row>
                            <Button 
                                type="submit" 
                                className="bg-primary">
                                Submit 
                            </Button>   



                               <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>                          
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
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
                                    model="rating"
                                    show="touched"
                                    messages={{
                                    minLength: 'Must be greater than 2 characters ',
                                    maxLength: 'Must be less than 15 characters '
                                }}/>
                                </Col>
                           </Row>                                                
                       </LocalForm>            
            </ModalBody>

            </Modal>
            </>
        );
    }
}

function RenderDish({dish}){ // this div sets the comments on other side
    return(
        <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg top src={dish.image} alt={dish.name}/>                   
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );}

function RenderComments({comments, addComment, dishId})
    {//This object destructuring 
        if (comments != null){
            return (
                <div className ="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                     <ul className = "list-unstyled">
                         {comments.map((comment)=> {
                             return(
                                 <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>--- {comment.author} {new Date().toISOString()}</p>
                                </li> 
                             );
                         })}               
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
             );
            
    }
}

//Container is used to create boxed content
// Comments are coming separately now 
const DishDetail = (props) => {
    if (props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading/> 
                </div>
            </div>
        );
    }else if(props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null){   
        return( 
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>  
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                    addComment={props.addComment} dishId={props.dish.id}/>    
            </div>
        </div>
        );
    }
    else return(<div></div>);
}

export default DishDetail;

    