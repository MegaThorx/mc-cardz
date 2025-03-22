import { useState } from "react";

export default function ({ }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <h1 className="text-2xl font-medium">Login with your credentials</h1>
        <form className="mt-4" onSubmit={(event) => {
            event.preventDefault();
            fetch('https://localhost:7016/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
        }}>
            <label className="block">Username:</label>
            <input className="border" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />

            <label className="block mt-2">Password:</label>
            <input className="border" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

            <button className="block border mt-4 hover:bg-gray-300" type="submit">Login</button>
        </form>
    </>;
}