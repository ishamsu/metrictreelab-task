import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect , browserHistory} from "react-router-dom";
import dwuser from "./services/dw-user";
import Login from "./component/login-component.js";
import NoMatch from "./component/404";
import logo from './image/logogrey.png';
import ChangePassword from "./component/changepassword";
import Home from "./component/home";
import Signup from "./component/signup";



import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = dwuser.getcurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    dwuser.logout();
  }

  render() {
    const { currentUser} = this.state;

    return (
      <Router>
        <div> 
        {currentUser && (

          <nav className="navbar navbar-expand navbar-dark bg-special shadow p-3 mb-5 rounded">
            
            <Link to={"/metric"}className="navbar-brand">
            <img
            src={logo}
            alt="logo-img"
            className="" style={{width: "40px"}}
          />            </Link>
            
            <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/user/home"} className="nav-link text-secondary" >
                  <strong>Home</strong>
                </Link>
              </li>
              
            </div>

            {currentUser && (

              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                 <Link to={"/changepassword/" + currentUser.uid} className="nav-link text-secondary">
                <strong style={{textDecoration: "underline", fontSize:"13px", fontStyle: "italic"}}>Logged in as-<br></br>{currentUser.username}</strong> 
                 </Link>
               </li>
                <li className="nav-item">
                  <a href="/user/login" className="nav-link text-black-50" onClick={this.logOut}>
                  <button class="btn btn-sm btn-outline-danger" type="button">✕ LogOut</button>
                  </a>
                </li>
              </div>
    
        )}



          </nav>

        )}

          <div className="container mt-3">

            <Switch>
            <Route  exact path="/user/login"  render={() => (currentUser ? ( <Login/> ) : ( <Login/>))}/>
            <Route  exact path="/user/signup"  render={() => (currentUser ? ( <Login/> ) : ( <Signup/>))}/>
            <Route   path="/user/home"   render={() => (currentUser ? ( <Home/> ) : ( <NoMatch/>))}/>
            <Route exact path="/changepassword/:id" render={() => (currentUser ? ( <ChangePassword/> ) : ( <NoMatch/>))}/>
            <Route  exact path="/metric" component={() => { window.location.href = 'https://metrictreelabs.com/';  //set logo route
     return null;}}/> 
            {/* 
            <Route exact path={"/user/home"} component={Typelist}/>

            <Route exact path={"/fuck/:id"} component={Addcontent}/>
              */}
     <Route exact path="*"><NoMatch /> </Route>

            </Switch>
          </div>
                 

        </div>
      </Router>

    );
  }
}


export default App;
