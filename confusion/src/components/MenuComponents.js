import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap'; 

class Menu extends Component {
    constructor(props) {
        super(props); // Required when defining a class component
        //properties that we can make use of 
        this.state = {
           
        }
    }
    render() {//Construct view for each item in list, each requires key attribute 
        const menu = this.state.dishes.map((dish)=>{
            return (
                <div key={dish.id} className="col-12 mt-5">
                    <Media tag="li"> 
                        <Media left middle>
                            <Media object src={dish.image} alt={dish.name}/> 
                            
                        </Media>

                        <Media body className="ml-5">
                            <Media haeding>{dish.name}</Media>
                            <p>{dish.description}</p>
                        </Media>

                    </Media>
                </div>
            );
        }); 
        return ( 
        <div className="container">
            <div className="row">
                <Media list>
                    {menu}
                </Media>
            </div>
        </div>
        );
    }
}

export default Menu; 