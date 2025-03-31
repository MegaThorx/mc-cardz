import {ComponentProps} from "react";
import {useApi} from "../contexts/ApiProvider.tsx";
import {useSub} from "../hooks/usePubSub.ts";

export type Answer = {
    id: string;
    text: string;
    isCorrect: boolean;
    isAiGenerated: boolean;
}

type AnswerInputProps = ComponentProps<'div'> & {
    question: String,
    name: string;
    title: string;
    answer: Answer;
    setAnswer: (answer: Answer) => void;
};

export default ({question, name, title, answer, setAnswer}: AnswerInputProps) => {
    const {sendMessage} = useApi();
    
    useSub("ReceiveMessage", (response: any) => {
       if (answer.id.toString() === response.identifier) {
           setAnswer({id: answer.id, text: response.response, isAiGenerated: true, isCorrect: false});
       } 
    });

    const generateAiResponse = (event: any) => {
        event.preventDefault();
        sendMessage(answer.id.toString(), `Generate an incorrect answer to the following question: ${question}`);
    };
    
    return <div className="mb-3">
        <label htmlFor={name} className="form-label fw-bold mt-2">{title}</label>
        <input type="text" className="form-control" id={name} value={answer.text}
               onChange={(event) => {
                   setAnswer({id: answer.id, text: event.target.value, isCorrect: answer.isCorrect, isAiGenerated: answer.isAiGenerated});
           }} />
        <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" checked={answer.isCorrect} id={`${name}-correct`} onChange={(event) => {
                setAnswer({id: answer.id, text: answer.text, isCorrect: event.target.checked, isAiGenerated: answer.isAiGenerated});
            }}/>
            <label className="form-check-label" htmlFor={`${name}-correct`}>
                Is correct?
            </label>
        </div>

        <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" checked={answer.isAiGenerated} id={`${name}-ai`} onChange={(event) => {
                setAnswer({id: answer.id, text: answer.text, isCorrect: answer.isCorrect, isAiGenerated: event.target.checked});
            }} />
            <label className="form-check-label" htmlFor={`${name}-ai`}>
                Is AI generated?
            </label>
        </div>

        <button className="btn btn-primary mt-3" onClick={generateAiResponse}>Generate with AI</button>
    </div>;  
};