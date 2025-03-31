import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Topic from "../../models/Topic.ts";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";

export default () => {
    const params = useParams();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const {api} = useApi();

    useEffect(() => {
        api.get(`api/topics/${params.topicId}`)
            .then((response) => setTopic(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));
    }, [])

    if (topic === null) {
        return <>
            <h1>Delete Topic</h1>
            <div>
                <span className="spinner-border me-2"></span>
                <span role="status">Loading...</span>
            </div>
        </>;
    }

    return <>
        <h1>Delete Topic</h1>
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();

            setIsLoading(true);
            api.delete(`/api/topics/${params.topicId}`)
                .then(() => navigate('/topics'))
                .catch(() => toast(ToastType.Danger, 'Unable to delete topic'))
                .finally(() => setIsLoading(false));
        }}>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={topic.name} disabled/>
            </div>

            <button type="submit" className="btn btn-danger" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : null}
                Delete
            </button>
        </form>
    </>;
};