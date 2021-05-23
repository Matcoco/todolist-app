import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';

const SIGIN_URL = process.env.REACT_APP_SIGNIN;


function Signin({handleLoggoutState}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const handleSubmitButton = (event) => {
        event.preventDefault();

        if (email !== "" && password !== "") {
            const body = {
                email: email,
                password: password
            }


            axios.post(SIGIN_URL, body)
                .then(response => {
                    if (response.status === 200) {
                        window.localStorage["data"] = JSON.stringify(response.data);
                        if (body.email === jwt_decode(response.data.token).email && response.data.token) {
                            history.push('/home');
                            handleLoggoutState(true);
                        }

                    } else {
                        console.log("échec de la connexion");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log("merci de remplir les champs!");
        }
    }

    return (

        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(event) => handleSubmitButton(event)}>Connexion</Button>
        </Form>

    )
}

export default Signin;