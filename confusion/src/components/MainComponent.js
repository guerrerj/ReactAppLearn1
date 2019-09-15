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
import {postComment, fetchDishes, fetchComments, fetchPromotions} from '../redux/ActionCreaters';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

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
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
    ,fetchDishes: () => {dispatch(fetchDishes())} 
    ,resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
    ,fetchPromotions: () => {dispatch(fetchPromotions())} 
    ,fetchComments: () => {dispatch(fetchComments())} 

  });

class Main extends React.Component{
  constructor(props) {
    super(props);
  } 

  // loading dishes to store at point where the main mounts 
 componentDidMount(){
   this.props.fetchDishes();
   this.props.fetchComments();
   this.props.fetchPromotions(); 
 }
 
  render() {
    //funtion component inline or explicit
    const HomePage = () => {
      return (// use array filter in javascript
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess} 
        promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
        promotionsLoading={this.props.promotions.isLoading}
        promotionsErrMess={this.props.promotions.errMess} 
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
        comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}/>
      );
    }
    // Route links the path to the component being mentioned 
    return (//use exact for path matching, menu component to use props needs inline function
      <div>
        <Header/> 
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes.dishes}/>}/>
          <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
          <Redirect to="/home" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div> 
    );// Filter function gives elements for which the property matches as an array
  }  // In order to prevent switch from going to both we use exact 
}
//Menu is self closing 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
