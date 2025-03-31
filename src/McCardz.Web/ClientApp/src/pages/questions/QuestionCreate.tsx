import {useState} from "react";
import AnswerInput, {Answer} from "../../components/AnswerInput.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";
import {useNavigate, useParams} from "react-router";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import axios from "axios";

export default () => {
    const params = useParams();
    const [question, setQuestion] = useState<string>("");
    const [answer1, setAnswer1] = useState<Answer>({text: "", isCorrect: true, isAiGenerated: false});
    const [answer2, setAnswer2] = useState<Answer>({text: "", isCorrect: false, isAiGenerated: false});
    const [answer3, setAnswer3] = useState<Answer>({text: "", isCorrect: false, isAiGenerated: false});
    const [answer4, setAnswer4] = useState<Answer>({text: "", isCorrect: false, isAiGenerated: false});
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const {api} = useApi();
        
    const save = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        api.post('/api/questions', {
            topicId: params.topicId,
            text: question,
        })
        .then((response) => {
            const questionId = response.data.id;

            axios.all([
                api.post('/api/answers', {
                    questionId: questionId,
                    text: answer1.text,
                    isCorrect: answer1.isCorrect,
                    isAiGenerated: answer1.isAiGenerated,
                }),
                api.post('/api/answers', {
                    questionId: questionId,
                    text: answer2.text,
                    isCorrect: answer2.isCorrect,
                    isAiGenerated: answer2.isAiGenerated,
                }),
                api.post('/api/answers', {
                    questionId: questionId,
                    text: answer3.text,
                    isCorrect: answer3.isCorrect,
                    isAiGenerated: answer3.isAiGenerated,
                }),
                api.post('/api/answers', {
                    questionId: questionId,
                    text: answer4.text,
                    isCorrect: answer4.isCorrect,
                    isAiGenerated: answer4.isAiGenerated,
                })
            ])
            .then(() => navigate(`/topics/${params.topicId}`))
            .catch(() => toast(ToastType.Danger, "Failed to save answers"));
            
        }).catch(() => toast(ToastType.Danger, "Failed to save question"));
    };
    
    return <>
        <h1>Create a Question</h1>
        <form onSubmit={save}>
            <div className="mb-3">
                <label htmlFor="question" className="form-label fw-bold mt-3">Question</label>
                <input type="text" className="form-control" id="question" value={question}
                       onChange={(event) => setQuestion(event.target.value)}/>
            </div>

            <AnswerInput question={question} name="answer-1" title="Answer 1" answer={answer1} setAnswer={setAnswer1} />
            <AnswerInput question={question} name="answer-2" title="Answer 2" answer={answer2} setAnswer={setAnswer2} />
            <AnswerInput question={question} name="answer-3" title="Answer 3" answer={answer3} setAnswer={setAnswer3} />
            <AnswerInput question={question} name="answer-4" title="Answer 4" answer={answer4} setAnswer={setAnswer4} />

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : null}
                Save
            </button>
        </form>
    </>;
};