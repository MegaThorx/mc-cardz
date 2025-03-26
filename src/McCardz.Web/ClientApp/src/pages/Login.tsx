import { useState } from "react";
import {useAuth} from "../contexts/AuthProvider.tsx";
import api from "../api.ts";

export default function ({ }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const {setToken} = useAuth();

    return <>
        <h1>Login with your credentials</h1>
        {errorMessage !== '' ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : null}
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();
            api.post('/api/auth/login', {
                username: username,
                password: password
            })
                .then((response) => {
                    setErrorMessage('');
                    setToken(response.data.token);
                })
                .catch((error) => {
                        if (error.status === 401) {
                            setErrorMessage('Invalid credentials');
                        } else {
                            setErrorMessage('Unknown error in the backend');
                        }
                    }
                );
        }}>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </>;
}