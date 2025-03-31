import {useState} from "react";
import AnswerInput, {Answer} from "../../components/AnswerInput.tsx";
import {useApi} from "../../contexts/ApiProvider.tsx";

export default () => {
    const [question, setQuestion] = useState<string>("");
    const [answer1, setAnswer1] = useState<Answer>({text: 'Answer 1', isCorrect: false, isAiGenerated: false});
    const [answer2, setAnswer2] = useState<Answer>({text: 'Answer 2', isCorrect: true, isAiGenerated: false});
    const [answer3, setAnswer3] = useState<Answer>({text: 'Answer 3', isCorrect: false, isAiGenerated: true});
    const [answer4, setAnswer4] = useState<Answer>({text: 'Answer 4', isCorrect: true, isAiGenerated: true});
    const [isLoading, setIsLoading] = useState(false);
    const api = useApi();
    
    const save = () => {
        setIsLoading(true);
    };
    
    return <>
        <h1>Create question</h1>
        <form onSubmit={save}>
            <div className="mb-3">
                <label htmlFor="question" className="form-label">Question</label>
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