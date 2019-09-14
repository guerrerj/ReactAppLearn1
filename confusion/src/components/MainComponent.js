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
import {addComment, fetchDishes} from '../redux/ActionCreaters';
import {actions} from 'react-redux-form';

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

// Action creator returns action object given to dispatch which can then be used by components
const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
    ,fetchDishes: () => {dispatch(fetchDishes())} 
    ,resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
  });

class Main extends React.Component{
  constructor(props) {
    super(props);
  } 

  // loading dishes to store at point where the main mounts 
 componentDidMount(){
   this.props.fetchDishes();
 }
 
  render() {
    //funtion component inline or explicit
    const HomePage = () => {
      return (// use array filter in javascript
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess} 
        promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    }
    //Will get parameter that is required, only interested in match
    const DishWithId = ({match}) =>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]} 
        //Converts string to integer parseInts() 
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess} 
        comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}/>
      );
    }
    // Route links the path to the component being mentioned 
    return (//use exact for path matching, menu component to use props needs inline function
      <div className="App">
        <Header/> 
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes.dishes}/>}/>
          <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
