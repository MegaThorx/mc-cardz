import {NavLink, useParams} from "react-router";
import {useEffect, useState} from "react";
import Topic from "../../models/Topic.ts";
import api from "../../api.ts";
import Question from "../../models/Question.ts";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";

export default () => {
    const params = useParams();
    const [topic, setTopic] = useState<Topic>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const toast = useToast();

    useEffect(() => {
        api.get(`api/topics/${params.topicId}`)
            .then((response) => setTopic(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));

        api.get(`api/topics/${params.topicId}/questions`)
            .then((response) => setQuestions(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch questions'));
    }, [params.topicId]);

    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Topic: {topic?.name}</h1>
            <div>
                <NavLink to={`/topics/${params.topicId}/edit`} className="btn btn-sm btn-primary me-2">Edit</NavLink>
                <NavLink to={`/topics/${params.topicId}/delete`} className="btn btn-sm btn-danger">Delete</NavLink>
            </div>
        </div>
        <NavLink to={`/topics/${params.topicId}/quiz`} className="btn btn-primary my-4">Quiz me</NavLink>
        <div className="d-flex justify-content-between align-items-center">
            <h2>Questions</h2>
            <NavLink to={`/topics/${params.topicId}/question`} className="btn btn-sm btn-primary me-2">Add question</NavLink>
        </div>
        <ul>
            {questions.map((question) => (
                <li key={question.id}><NavLink to={`/questions/${question.id}`}>{question.text}</NavLink></li>
            ))}
        </ul>
    </>;
};