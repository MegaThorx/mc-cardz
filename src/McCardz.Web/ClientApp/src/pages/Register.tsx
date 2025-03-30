import {useState} from "react";
import {useNavigate} from "react-router";
import api from "../api.ts";
import {ToastType, useToast} from "../contexts/ToastProvider.tsx";

export default function ({}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    return <>
        <h1>Create your account</h1>
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();
            api.post('/api/auth/register', {
                username: username,
                email: email,
                password: password
            })
                .then(() => {
                    navigate('/login');
                })
                .catch((error) => {
                    toast(ToastType.Danger, error.response.data.message);
                });
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