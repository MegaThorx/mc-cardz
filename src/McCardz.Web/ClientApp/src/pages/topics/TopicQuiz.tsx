import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Topic from "../../models/Topic.ts";
import Question from "../../models/Question.ts";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";
import Answer from "../../models/Answer.ts";

export default () => {
    const params = useParams();
    const [topic, setTopic] = useState<Topic>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const [checkedAnswers, setCheckedAnswers] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

    const toast = useToast();
    const {api} = useApi();

    useEffect(() => {
        api.get(`api/topics/${params.topicId}`)
            .then((response) => setTopic(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));

        api.get(`api/topics/${params.topicId}/questions`)
            .then((response) => setQuestions(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch questions'));
    }, [params.topicId]);

    useEffect(() => {
        if (questions[questionIndex]) {
            setCorrectAnswers([]);
            api.get(`api/questions/${questions[questionIndex].id}/answers`)
                .then((response) => setAnswers(response.data))
                .catch(() => toast(ToastType.Danger, 'Unable to fetch answers'));
        }
    }, [questionIndex, questions]);

    if (topic === null || questions.length === 0 || answers.length === 0) {
        return <>
            <h1>Quiz Topic</h1>
            <div>
                <span className="spinner-border me-2"></span>
                <span role="status">Loading...</span>
            </div>
        </>;
    }

    if (questionIndex >= questions.length) {
        return <>
            <h1>Quiz: {topic?.name}</h1>
            <span>You have answered all questions!</span>
        </>
    }

    return <>
        <h1>Quiz: {topic?.name}</h1>
        <h2 className="mb-3">{questions[questionIndex].text}</h2>
        <form onSubmit={(event) => {
            event.preventDefault();

            setCorrectAnswers(answers.filter(item => item.isCorrect).map(item => item.id));
        }}>
            {answers.map((answer) => (
                <div className="form-check" key={answer.id}>
                    <input className="form-check-input" type="checkbox" id={`answer-${answer.id}`}
                           disabled={correctAnswers.length > 0} checked={checkedAnswers.includes(answer.id)}
                           onChange={(event) => {
                               if (event.target.checked) {
                                   setCheckedAnswers([...checkedAnswers, answer.id]);
                               } else {
                                   setCheckedAnswers(checkedAnswers.filter((item) => item !== answer.id));
                               }
                           }}/>
                    <label
                        className={"form-check-label " + (correctAnswers.length > 0 ? (correctAnswers.includes(answer.id) ? "text-success" : "text-danger") : "")}
                        htmlFor={`answer-${answer.id}`}>
                        {answer.text}
                    </label>
                </div>
            ))}

            {correctAnswers.length === 0 ?
                <button className="btn btn-primary mt-3" type="submit">Check</button> :
                <button className="btn btn-primary mt-3" type="button" onClick={() => {
                    setQuestionIndex(questionIndex + 1);
                }}>Next</button>
            }
        </form>
    </>;
};