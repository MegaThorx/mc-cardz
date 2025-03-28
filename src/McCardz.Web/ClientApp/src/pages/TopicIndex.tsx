import {useEffect, useState} from "react";
import Topic from "../models/Topic.ts";
import api from "../api.ts";
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
        <h1>Topics</h1>
        {topics.map((topic) => (
            <div key={topic.id}>
                <NavLink to={`/topics/${topic.id}`}>{topic.name}</NavLink>
            </div>
        ))}
    </>
}