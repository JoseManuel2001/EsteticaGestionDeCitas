// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/Login" exact component={Login} />
        <Route path="/registro" component={Registro} />
      </div>
    </Router>
  );
}

export default App;