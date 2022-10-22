import React from 'react'
import Main from './components/MainComponent'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    )
  }
}

export default App
