import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

class Main extends React.Component{
  constructor(props) 
  {
    super(props);
    this.state = {
      dishes: DISHES, // doesnt receive any props but has the dishes 
    }; 
  } // can pass data as props using curly braces 
 
  render() {
    //funtion component inline or explicit
    const HomePage = () => {
      return (
        <Home/>
      );
    }
    return (//use exact for path matching, menu component to use props needs inline function
      <div className="App">
        <Header/> 
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );// Filter function gives elements for which the property matches as an array
  }  
}
//Menu is self closing 
export default Main;
