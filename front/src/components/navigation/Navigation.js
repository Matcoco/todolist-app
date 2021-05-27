import {
    Button,
    Navbar,
    Nav

} from 'react-bootstrap';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { NavLink } from "react-router-dom";
import { myContext } from '../../reducerAndContext/context';


function Navigation() {

    let history = useHistory();
    const { state, handleLoggoutState } = useContext(myContext);
 
    const handlerSignout = () => {
        window.localStorage.removeItem(process.env.REACT_APP_THING);
        if (state.isloggin) {
            handleLoggoutState(false);
            history.push('/signin');
        }
    }

    return (
        <div>
            {state.isloggin && <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">My SUPER ToDoList</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about-me">About me</NavLink>
                        <NavLink to="/contact-me">Contact me</NavLink>
                    </Nav>
                    <Button variant="outline-success" onClick={handlerSignout}>signout</Button>
                </Navbar.Collapse>
            </Navbar>}
        </div>
    )
}


export default Navigation;