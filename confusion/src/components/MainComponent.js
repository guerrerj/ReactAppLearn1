import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';

class Main extends React.Component{
  constructor(props) 
  {
    super(props);
    this.state = {
      dishes: DISHES, // doesnt receive any props but has the dishes 
      selectedDish: null
    }; 
  } // can pass data as props using curly braces 
  onDishSelect = (dishId) => { // Only tracking dish id not entire dish
      this.setState({selectedDish:dishId}); 
  }; 

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Jose's Confusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={this.onDishSelect}/> 
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/>
      </div>
    );// Filter function gives elements for which the property matches as an array
  }  
}
//Menu is self closing 
export default Main;
