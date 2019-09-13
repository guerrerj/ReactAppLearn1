import React from 'react';
import { Card, CardImg,  CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import {Link} from 'react-router-dom';


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
        );
    }
    
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
    );        
}

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
else
    return(
        <div>
        </div>            
);
}
export default DishDetail;

    