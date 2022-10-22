import React from 'react'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './Menu'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    }
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId })
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      )
    }

    const AboutPage = () => {
      return <About leaders={this.state.leaders} />
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              dish => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
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
            path="/menu"
            component={() => (
              <>
                <Menu
                  dishes={this.state.dishes}
                  onClick={dishId => this.onDishSelect(dishId)}
                />
              </>
            )}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={AboutPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main
