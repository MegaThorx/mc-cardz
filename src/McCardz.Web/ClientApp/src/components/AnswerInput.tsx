import {ComponentProps} from "react";

export type Answer = {
    text: string;
    isCorrect: boolean;
    isAiGenerated: boolean;
}

type AnswerInputProps = ComponentProps<'div'> & {
    name: string;
    title: string;
    answer: Answer;
    setAnswer: (answer: Answer) => void;
};

export default ({name, title, answer, setAnswer}: AnswerInputProps) => {
    return <div className="mb-3">
        <label htmlFor={name} className="form-label">{title}</label>
        <input type="text" className="form-control" id={name} value={answer.text}
               onChange={(event) => {
                   setAnswer({text: event.target.value, isCorrect: answer.isCorrect, isAiGenerated: answer.isAiGenerated});
           }} />
        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={answer.isCorrect} id={`${name}-correct`} onChange={(event) => {
                setAnswer({text: answer.text, isCorrect: event.target.checked, isAiGenerated: answer.isAiGenerated});
            }}/>
            <label className="form-check-label" htmlFor={`${name}-correct`}>
                Is correct?
            </label>
        </div>

        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={answer.isAiGenerated} id={`${name}-ai`} onChange={(event) => {
                setAnswer({text: answer.text, isCorrect: answer.isCorrect, isAiGenerated: event.target.checked});
            }} />
            <label className="form-check-label" htmlFor={`${name}-ai`}>
                Is AI generated?
            </label>
        </div>

        <button className="btn btn-primary" type="submit">Generate with AI</button>
    </div>;  
};