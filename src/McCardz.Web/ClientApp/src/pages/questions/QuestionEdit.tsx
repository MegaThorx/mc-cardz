import {useEffect, useState} from "react";
import AnswerInput, {Answer} from "../../components/AnswerInput.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";
import {useNavigate, useParams} from "react-router";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import axios from "axios";

export default () => {
    const params = useParams();
    const [question, setQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const {api} = useApi();

    useEffect(() => {
        api.get(`api/questions/${params.questionId}`)
            .then((response) => setQuestion(response.data.text))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));

        api.get(`api/questions/${params.questionId}/answers`)
            .then((response) => setAnswers(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch questions'));
    }, [params.questionId]);

    const save = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        api.put(`/api/questions/${params.questionId}`, {
            text: question,
        })
            .then(() => {
                const updates = answers.map((answer) => api.put(`/api/answers/${answer.id}`, {
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                    isAiGenerated: answer.isAiGenerated,
                }));
                axios.all(updates)
                    .then(() => navigate(`/questions/${params.questionId}`))
                    .catch(() => toast(ToastType.Danger, "Failed to save answers"));

            }).catch(() => toast(ToastType.Danger, "Failed to save question"));
    };

    const setAnswer = (newAnswer: Answer) => {
        console.log(answers, newAnswer);
        setAnswers([...answers.filter(x => x.id !== newAnswer.id), newAnswer]);
    };

    return <>
        <h1>Create a Question</h1>
        <form onSubmit={save}>
            <div className="mb-3">
                <label htmlFor="question" className="form-label text-bold">Question</label>
                <input type="text" className="form-control" id="question" value={question}
                       onChange={(event) => setQuestion(event.target.value)}/>
            </div>

            {answers.sort((a, b) => a.id > b.id ? 1 : -1).map((answer, index) => (
                <AnswerInput key={answer.id} question={question} name={`answer-${index + 1}`}
                             title={`Answer ${index + 1}`} answer={answer} setAnswer={setAnswer}/>
            ))}

            <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : null}
                Save
            </button>
        </form>
    </>;
};