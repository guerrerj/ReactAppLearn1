import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

export default class DishdetailComponent extends Component{

    constructor(props)  {
        super(props); 
    }
    renderComments = () => {
        const comments = this.props.dish.comments.map(
            (com) => {
            return (<CardText>{com.comment} {com.author} {com.rating} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</CardText>); 
            } ); 

        return (
            <div className ="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <Card>
                  {comments}
                </Card>
            </div>
        );        
    }

    renderDish = () => {
        return(
            <div className="col-12 col-md-5 m-1">
            <Card>
               < CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>                   
               <CardBody>
                  <CardTitle>{this.props.dish.name}</CardTitle>
                  <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }

    render(){        
            if (this.props.dish != null){   
                return(       
                <div className="row">
                   {this.renderDish()}
                   {this.renderComments()}            
                </div>
                );
            }
        else
            return(
                <div></div>            
        );
    }
}