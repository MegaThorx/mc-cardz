import {NavLink, useParams} from "react-router";
import {useEffect, useState} from "react";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import Question from "../../models/Question.ts";
import Answer from "../../models/Answer.ts";
import {useApi} from "../../contexts/ApiProvider.tsx";

export default () => {
    const params = useParams();
    const [question, setQuestion] = useState<Question>();
    const [answers, setAnswers] = useState<Answer[]>();
    const toast = useToast();
    const {api} = useApi();
    
    useEffect(() => {
        api.get(`api/questions/${params.questionId}`)
            .then((response) => setQuestion(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));

        api.get(`api/questions/${params.questionId}/answers`)
            .then((response) => setAnswers(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch questions'));
    }, [params.questionId]);
    
    if (!question || !answers) {
        return <>
            <h1>Question</h1>
            <div>
                <span className="spinner-border me-2"></span>
                <span role="status">Loading...</span>
            </div>
        </>;
    }
    
    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Question: {question.text}</h1>
            <div>
                <NavLink to={`/questions/${params.questionId}/edit`} className="btn btn-sm btn-primary me-2">Edit</NavLink>
                <NavLink to={`/questions/${params.questionId}/delete`} className="btn btn-sm btn-danger">Delete</NavLink>
            </div>
        </div>
        <ul>
            {answers.map((item) => (
                <li key={item.id} className="my-3">{item.text}</li>
            ))}
        </ul>
    </>  
};