import {NavLink} from "react-router";
import {useAuth} from "../contexts/AuthProvider.tsx";

const navigation = [
    { name: 'Topics', href: '/topics', auth: true },
    { name: 'Login', href: '/login', auth: false },
    { name: 'Register', href: '/register', auth: false },
];

export default function () {
    const {token} = useAuth();
    
    return <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span className="fs-4">McCardz</span>
            </a>
            
            <ul className="nav nav-pills">
                {navigation.filter(item => (item.auth && token !== '') || (!item.auth && token === '')).map((item, itemId) => (
                    <li className="nav-item" key={itemId}>
                        <NavLink className="nav-link" to={item.href}>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </header>
    </div>;
}