import { useState } from "react";
import {NavLink} from "react-router";
import api from "../api.ts";

export default function ({ }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    return <>
        <h1 className="text-2xl font-medium">Create your account</h1>

        {isRegistered ? <h2 className="text-xl text-green-600">Successfully registered. <NavLink className="underline hover:text-green-700" to="/login">Sign in here.</NavLink></h2> : null}
        
        {errorMessage !== '' ? <span className="block text-xl text-red-600">{errorMessage}</span> : null}
        <form className="mt-4" onSubmit={(event) => {
            event.preventDefault();
            api.post('/api/auth/register', {
                    username: username,
                    email: email,
                    password: password
                })
                .then(() => {
                    setErrorMessage('');
                    setIsRegistered(true);
                })
                .catch((error) => {
                        setErrorMessage(error.response.data.message);
                    }   
                );
        }}>
            <label className="block">Username:</label>
            <input className="border" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />

            <label className="block">Email:</label>
            <input className="border" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

            <label className="block mt-2">Password:</label>
            <input className="border" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

            <button className="block border mt-4 hover:bg-gray-300" type="submit">Register</button>
        </form>
    </>;
}