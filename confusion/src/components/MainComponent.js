import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import Contact from './ContactComponent'; 
import DishDetail from './DishdetailComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

class Main extends React.Component{
  constructor(props) 
  {
    super(props);
    this.state = {
      dishes: DISHES, // doesnt receive any props but has the dishes 
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }; 
  } // can pass data as props using curly braces 
 // Will be rendering a featured of each state member
  render() {
    //funtion component inline or explicit
    const HomePage = () => {
      return (// use array filter in javascript
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    }
    //Will get parameter that is required, only interested in match
    const DishWithId = ({match}) =>{
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]} 
        //Converts string to integer parseInts() 
        comments={this.state.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>
      );
    }
    return (//use exact for path matching, menu component to use props needs inline function
      <div className="App">
        <Header/> 
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );// Filter function gives elements for which the property matches as an array
  }  // In order to prevent switch from going to both we use exact 
}
//Menu is self closing 
export default Main;
