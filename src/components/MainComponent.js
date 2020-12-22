import Menu from './MenuComponent';
import React,{Component} from 'react';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import {Switch, Route, Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {addComment,fetchDishes} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'
const mapStateToProps=state=>{ // map the redux stores state into props so that they become available to all
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => // This addComment is a dispatch object also having a action object 
  dispatch(addComment(dishId, rating, author, comment)), // This will return an action object
  fetchDishes:() =>{dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
  // Then the action object is passed to dispatch
})
class Main extends Component{ // Container component
  constructor(props){

      super(props);
    
  }
  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
}

componentDidMount(){
  console.log("Refresh happened , dishes being reloaded")
  this.props.fetchDishes();

}


render() {
    const HomePage = () =>{
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotions={this.props.promotions.filter((promo)=> promo.featured)[0]}
            leader={this.props.leaders.filter((lead)=>lead.featured)[0]}
            />
        );
    }
    const DishWithId=({match}) =>{
      return (
        <Dishdetail dishDetail={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]} //converting string id to base 10ten foltering the id from dishes and sending
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
      addComment={this.props.addComment}// passing the dispatcher object with action object to dishdetail
      />
        );
    }
  return (
    <div>
    <Header/>
    <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>{/**Passing props inside router */}
        <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route path="/aboutus" component= {() => <About leaders={this.props.leaders}/>}/>
        <Redirect to="/home"/>{/**Default */}
    </Switch>
    <Footer/>
    </div>
    
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); // supplying store  to main with router
