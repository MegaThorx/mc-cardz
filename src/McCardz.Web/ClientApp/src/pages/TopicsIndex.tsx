import {useEffect, useState} from "react";
import Topic from "../models/Topic.ts";
import api from "../api.ts";

export default function ({}) {
    const [topics, setTopics] = useState<Topic[]>([]);
    
    useEffect(() => {
        api.get('/api/topics')
            .then((response) => {
                setTopics(response.data); 
            });
    }, []);
    
    return <>
        {topics.map((topic) => (
            <div key={topic.id}>{topic.name}</div>
        ))}
    </>
}