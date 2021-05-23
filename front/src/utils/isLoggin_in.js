import jwt_decode from "jwt-decode";

export function isLoggin_in() {
    if (window.localStorage[process.env.REACT_APP_THING]) {
        if (jwt_decode(JSON.parse(window.localStorage[process.env.REACT_APP_THING]).token).email === JSON.parse(window.localStorage[process.env.REACT_APP_THING]).email) {
            return false;
        }
    }else{
        return true;
    }
}

