import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
            <Card>
               < CardImg width="100%" src={dish.image} alt={dish.name}/>                   
               <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }
    
function RenderComments({comments})
{//This object destructuring 
    const comm = comments.map((com) => {
           return (<CardText>{com.comment} {com.author} {com.rating} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</CardText>); 
        }); 

    return (
        <div className ="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <Card>
              {comm}
            </Card>
        </div>
    );        
}


const DishDetail = (props) => {
    if (props.dish != null){   
        return(       
        <div className="row">
           <RenderDish dish={props.dish}/>
           <RenderComments comments={props.dish.comments}/>    
        </div>
        );
    }
else
    return(
        <div></div>            
);
}
export default DishDetail;

    