import React from 'react'
import Main from './components/MainComponent'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Midterm from './midterm'
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Main />
            {/* <Midterm /> */}
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
