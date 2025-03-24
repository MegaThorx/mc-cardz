import { useState } from "react";
import api from "../api.ts";

export default function ({ }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return <>
        <h1 className="text-2xl font-medium">Login with your credentials</h1>
        {errorMessage !== '' ? <h2 className="text-xl text-red-600">{errorMessage}</h2> : null}
        <form className="mt-4" onSubmit={(event) => {
            event.preventDefault();
            api.post('/api/auth/login', {
                    username: username,
                    password: password
                })
                .then((response) => {
                    setErrorMessage('');
                    console.log(response);
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
            <label className="block">Username:</label>
            <input className="border" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />

            <label className="block mt-2">Password:</label>
            <input className="border" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

            <button className="block border mt-4 hover:bg-gray-300" type="submit">Login</button>
        </form>
    </>;
}