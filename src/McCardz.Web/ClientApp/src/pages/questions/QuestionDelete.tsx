import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {ToastType, useToast} from "../../contexts/ToastProvider.tsx";
import Question from "../../models/Question.ts";
import {useApi} from "../../contexts/ApiProvider.tsx";

export default () => {
    const params = useParams();
    const [question, setQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const {api} = useApi();
    
    useEffect(() => {
        api.get(`api/questions/${params.questionId}`)
            .then((response) => setQuestion(response.data))
            .catch(() => toast(ToastType.Danger, 'Unable to fetch topic'));
    }, [params.questionId]);
    
    if (!question) {
        return <>
            <h1>Delete question</h1>
            <div>
                <span className="spinner-border me-2"></span>
                <span role="status">Loading...</span>
            </div>
        </>;
    }
    
    return <>
        <h1>Delete question</h1>
        <form className="col-6" onSubmit={(event) => {
            event.preventDefault();

            setIsLoading(true);
            api.delete(`/api/questions/${params.questionId}`)
                .then(() => navigate(`/topics/${question.topicId}`))
                .catch(() => toast(ToastType.Danger, 'Unable to delete topic'))
                .finally(() => setIsLoading(false));
        }}>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={question.text} disabled/>
            </div>

            <button type="submit" className="btn btn-danger" disabled={isLoading}>
                {isLoading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : null}
                Delete
            </button>
        </form>
    </>  
};