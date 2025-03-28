import {useParams} from "react-router";
import {useEffect, useState} from "react";
import Topic from "../../models/Topic.ts";
import api from "../../api.ts";
import Question from "../../models/Question.ts";

export default () => {
  const params = useParams();
  const [topic, setTopic] = useState<Topic>();
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
      api.get(`api/topics/${params.topicId}`)
          .then((response) => {
            setTopic(response.data);
          });

    api.get(`api/topics/${params.topicId}/questions`)
        .then((response) => {
            console.log(response);
            setQuestions(response.data);
        });
  }, [params.topicId]);
  
  return <>
    <h1>Topic Details</h1>
    {topic?.name}
      <ul>
        {questions.map((question) => (
            <li key={question.id}>{question.text}</li>
        ))}
      </ul>
  </>;
};