import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './Menu'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { connect } from 'react-redux'
import { addComment, fetchDishes, fetchLeaders } from '../redux/actionCreators'
import { actions } from 'react-redux-form'

const mapStateToProps = state => {
  console.log(state)
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes())
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'))
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders())
  },
})

class Main extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    console.log('props main', props)
    super(props)
  }

  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchLeaders()
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this?.props?.dishes?.dishes?.filter(dish => dish.featured)[0]}
          promotion={
            this?.props?.promotions?.filter(promo => promo.featured)[0]
          }
          leader={
            this?.props?.leaders?.leaders?.filter(leader => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
        />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      )
    }

    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/aboutus"
            component={() => (
              <About
                leaders={this?.props?.leaders?.leaders}
                isLoading={this.props.leaders.isLoading}
                errMess={this.props.leaders.errMess}
              />
            )}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this?.props?.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
