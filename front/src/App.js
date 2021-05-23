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
import { SigninContext } from './components/signin/SigninContext';


const initialState = { isloggin: false, todos: [], user: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOGGIN":
      return { ...state, isloggin: action.value }
    case "SET_TODOS":
      return { ...state, todos: action.value }
    case "GET_USER_INFOS":
      return { ...state, user: action.value }
    default:
      return state;
  }
}

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
        <SigninContext.Provider value={state}>
          <Navigation handleLoggoutState={handleLoggoutState} />
          <Switch>
            <Route path="/home" component={() => <TodoList dispatch={() => {}} />} />
            <Route path="/about-me" component={AboutMe} />
            <Route path="/contact-me" component={ContactMe} />
            {state.isloggin && <Redirect to='/home' />}
            <Route path="/signin" component={() => <Signin handleLoggoutState={handleLoggoutState} />} />
          </Switch>
        </SigninContext.Provider>
      </Router>
    </div >
  );
}

export default App;
