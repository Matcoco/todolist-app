
import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { myContext } from '../../reducerAndContext/context';

const ContactMe = () => {
    let history = useHistory();
    const connexion = useContext(myContext);  
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