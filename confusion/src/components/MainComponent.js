import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import Contact from './ContactComponent'; 
import DishDetail from './DishdetailComponent';
import About from './AboutComponent'; 
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'; 

const mapStateToProps = state =>{
    return(
      {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders 
      }
    );
}

class Main extends React.Component{
  constructor(props) {
    super(props);
  } 

 
  // can pass data as props using curly braces 
 // Will be rendering a featured of each state member
  render() {
    //funtion component inline or explicit
    const HomePage = () => {
      return (// use array filter in javascript
        <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    }
    //Will get parameter that is required, only interested in match
    const DishWithId = ({match}) =>{
      return(
        <DishDetail dish={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]} 
        //Converts string to integer parseInts() 
        comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>
      );
    }
    // Route links the path to the component being mentioned 
    return (//use exact for path matching, menu component to use props needs inline function
      <div className="App">
        <Header/> 
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );// Filter function gives elements for which the property matches as an array
  }  // In order to prevent switch from going to both we use exact 
}
//Menu is self closing 
export default withRouter(connect(mapStateToProps)(Main));
