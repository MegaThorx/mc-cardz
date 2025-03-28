import {useEffect, useState} from "react";
import Topic from "../../models/Topic.ts";
import api from "../../api.ts";
import {NavLink} from "react-router";

export default function ({}) {
    const [topics, setTopics] = useState<Topic[]>([]);
    
    useEffect(() => {
        api.get('/api/topics')
            .then((response) => {
                setTopics(response.data); 
            });
    }, []);
    
    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Topics</h1>
            <NavLink to="/topics/create" className="btn btn-sm btn-primary">Create topic</NavLink>
        </div>
        {topics.length === 0 ? <span>No topics found.</span> : null}
        {topics.map((topic) => (
            <div key={topic.id}>
                <NavLink to={`/topics/${topic.id}`}>{topic.name}</NavLink>
            </div>
        ))}
    </>
}