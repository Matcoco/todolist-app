import './App.css';
import Signin from './components/signin/Signin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TodoList from './components/todolist/TodoList';
import AboutMe from './components/about-me/AboutMe';
import ContactMe from './components/contact-me/ContactMe';
import Navigation from './components/navigation/Navigation';
import { isLoggin_in } from './utils/isLoggin_in';
import { useEffect, useReducer } from 'react';
import { myContext } from './reducerAndContext/context';
import {initialState, reducer } from './reducerAndContext/reducer';


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
 

  useEffect(() => {
    if (!isLoggin_in()) {
      dispatch({ type: "IS_LOGGIN", value: true });
    }
  }, []);

  const handleLoggoutState = (isOnline) => {
    dispatch({ type: "IS_LOGGIN", value: isOnline });
  }

  return (

    <div className="App">
      <Router>
        <myContext.Provider value={{state, handleLoggoutState}}>
          <Navigation />
          <Switch>
            <Route path="/home" component={TodoList} />
            <Route path="/about-me" component={AboutMe} />
            <Route path="/contact-me" component={ContactMe} />
            {state.isloggin && <Redirect to='/home' />}
            <Route path="/signin" component={Signin} />
          </Switch>
        </myContext.Provider>
      </Router>
    </div >
  );
}

export default App;
