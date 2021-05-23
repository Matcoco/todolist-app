
import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { SigninContext } from '../signin/SigninContext';

const ContactMe = () => {
    let history = useHistory();
    const connexion = useContext(SigninContext);  
    useEffect(() => {
        if (connexion.isLoggin) {
            history.push('/signin');
        }
    }, [history,connexion]);


    return (
        <div>
            Contact me page
        </div>
    );
}

export default ContactMe;