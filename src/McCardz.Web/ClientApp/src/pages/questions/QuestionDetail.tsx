import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../../api.ts";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import Question from "../../models/Question.ts";
import Answer from "../../models/Answer.ts";

export default () => {
    const params = useParams();
    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswers] = useState<Answer>();
    const toast = useToast();

    useEffect(() => {
        api.get(`api/questions/${params.questionId}`)
            .then((response) => setQuestion(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));

        api.get(`api/questions/${params.questionId}/answers`)
            .then((response) => setAnswers(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch questions'));
    }, [params.questionId]);
    
    return <>Question {params.questionId}</>  
};