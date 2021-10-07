import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './Home';
import Login from './Login'
import SignUp  from './SignUp';

function App() {
  return (
    <Router>
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/Home" component={Home}/>
    </Switch>
  </Router>
  );
}

export default App;
