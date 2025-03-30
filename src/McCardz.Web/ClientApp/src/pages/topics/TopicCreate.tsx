import api from "../../api.ts";
import {useState} from "react";
import {useNavigate} from "react-router";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";

export default () => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();

    return <>
        <h1>Create topic</h1>
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();

            setIsLoading(true);
            api.post('/api/topics', {
                name: name,
            })
                .then(response => {
                    navigate(`/topics/${response.data.id}`);
                })
                .catch(() => {
                    toast(ToastType.Danger, 'Unable to fetch topic');
                })
                .finally(() => setIsLoading(false));
        }}>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name}
                       onChange={(event) => setName(event.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : null}
                Create
            </button>
        </form>
    </>;
};