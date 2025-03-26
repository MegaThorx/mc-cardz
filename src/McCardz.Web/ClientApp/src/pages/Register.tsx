import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api.ts";

export default function ({ }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    return <>
        <h1>Create your account</h1>

        {errorMessage !== '' ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : null}
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();
            api.post('/api/auth/register', {
                    username: username,
                    email: email,
                    password: password
                })
                .then(() => {
                    setErrorMessage('');
                    navigate('/');
                })
                .catch((error) => {
                        setErrorMessage(error.response.data.message);
                    }   
                );
        }}>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </>;
}