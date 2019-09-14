import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';

// only within this file
function RenderCard({item, isLoading, errMess}){
    if (isLoading){
        return (
            <Loading/> 
        );
    }else if (errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else
        return( // No element is returned if no designation, javascript in code jsx
            <Card>
                <CardImg width="100%" src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
}
function Home(props){
    return(// Render featured in home container, m1 is margin 1
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                </div>
          </div>
        </div>
    );
} 
// React router to allow us to change form different views
// three have same components so they will render the same
export default Home; 