import {useEffect, useState} from "react";
import Topic from "../../models/Topic.ts";
import {NavLink} from "react-router";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";

export default function ({}) {
    const [topics, setTopics] = useState<Topic[]>([]);
    const toast = useToast();
    const {api} = useApi();

    useEffect(() => {
        api.get('/api/topics')
            .then((response) => {
                setTopics(response.data);
            })
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topics'));
    }, []);

    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Topics</h1>
            <NavLink to="/topics/create" className="btn btn-sm btn-primary">Create Topic</NavLink>
        </div>
        {topics.length === 0 ? <span>No Topics Found</span> : null}
        {topics.map((topic) => (
            <div key={topic.id} className="mt-3 fs-5 fw-bold">
                <NavLink to={`/topics/${topic.id}`} className="text-decoration-none">{topic.name}</NavLink>
            </div>
        ))}
    </>
}