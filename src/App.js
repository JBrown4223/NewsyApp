import React from 'react';
import './App.css';

import {Route, Switch, Link} from 'react-router-dom';
import SignUp from './sign-up.js';
import UserLogin from './login.js'; 
import MainPage from './main-page.js';
import SearchBar from'./search.js';
import MainContent from './main-content.js';
import SearchResults from './results.js';

function App() {
  return (
    <div className="App">
          <Header />
          <Navbar className="navbar navbar-default" />
          <hr />
            <Switch>
               <Route exact path='/' render={() => (<Home />)} />
               <Route exact path='/sign-up' render={() => (<SignUp />)} />
               <Route exact path='/login' render={() => (<UserLogin />)} />
               <Route exact path='/home/:id' render={(props) => (<MainPage id={props.match.params.id} />)} />
               <Route exact path='/results/:id' render={(props) => (<SearchResults id={props.match.params.id} />)} />
               <Route render={() => (<NotFound />)} />
            </Switch>
            <p>&nbsp;</p>
          <hr />
         <footer>
           <p>&copy; 2020, Jonathan Brown</p>
         </footer>
    </div>
  );
}

export default App;

//Header Function
const Header = () => {
  return (
    <div className="header">
      <div className="row">
        <h2>NEWSY</h2>
        <h4>Daily Headlines</h4>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to='/' className='navbar-brand'>Home page</Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
              <Link to='/sign-up' className='navbar-brand'>Sign Up</Link>
              <Link to='/login' className='navbar-brand'>Login</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}
 //Home page will contain:
 /*
    1) Search Bar
    2) Top Stories from US and Canada 
 */
const Home = () => {
  return (
    <div className="row">
        <SearchBar />
        <br />
        <br />
        <br />
        <MainContent />
    </div>
  );
}


// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
}