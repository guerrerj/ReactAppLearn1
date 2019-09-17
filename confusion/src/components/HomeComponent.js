import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'; 
import {FadeTransform} from 'react-animation-components';


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
            <FadeTransform  in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg width="100%" src={baseUrl + item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
}
function Home(props){
    return(// Render featured in home container, m1 is margin 1
        <div className="container">
            <div className="row row-content">
                <div className="col-md-4">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}/>
                </div>
                <div className="col-md-4">
                    <RenderCard item={props.promotion}
                    isLoading={props.promotionsLoading}
                    errMess={props.promotionsErrMess}/>
                </div>
                <div className="col-md-4">
                    <RenderCard item={props.leader}/>
                </div>
          </div>
        </div>
    );
} 
// React router to allow us to change form different views
// three have same components so they will render the same
export default Home; 