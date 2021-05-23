import { useEffect } from "react";
import { useHistory } from "react-router";
import { isLoggin_in } from '../../utils/isLoggin_in';

const AboutMe = () => {
    let history = useHistory();

    useEffect(() => {
        if (isLoggin_in()) {
            history.push('/signin');
        }
    }, [history]);
    return (
        <div>
            About me page
        </div>
    );
}

export default AboutMe;