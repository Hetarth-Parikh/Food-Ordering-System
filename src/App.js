import React, { createContext, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home'
import Categories from './Categories';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import Item from './Food-Items/Item';
import Login from './Login/Login';
import Signup from './SignUp/Signup';
import Logout from './Logout';
import Footer from './Footer/Footer'
import Error from './Error';
import Search from './Search/Search';
import { initialState, Reducer } from './Reducer/Reducer';
import './index.css';

const UserLoggedin = createContext();


const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <>
      <UserLoggedin.Provider value={{ state, dispatch }} >
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/categories/:name" render={() => <Categories />} />
          <Route exact path="/cart" render={() => <Cart />} />
          <Route exact path="/orders" render={() => <Orders />} />
          <Route exact path="/item/:id?/:catagory?" render={() => <Item />} />
          <Route exact path="/search/:name?" render={() => <Search />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route render={() => <Error />} />
        </Switch>
        <Footer />
      </UserLoggedin.Provider>
    </>
  )
}

export default App;
export { UserLoggedin };