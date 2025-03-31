import {BrowserRouter, Route, Routes} from "react-router";
import Navigation from "./components/Navigation.tsx";
import AuthProvider from "./contexts/AuthProvider.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import TopicIndex from "./pages/topics/TopicIndex.tsx";
import TopicDetails from "./pages/topics/TopicDetails.tsx";
import TopicCreate from "./pages/topics/TopicCreate.tsx";
import TopicEdit from "./pages/topics/TopicEdit.tsx";
import TopicDelete from "./pages/topics/TopicDelete.tsx";
import ToastProvider from "./contexts/ToastProvider.tsx";
import QuestionDetail from "./pages/questions/QuestionDetail.tsx";
import QuestionCreate from "./pages/questions/QuestionCreate.tsx";
import ApiProvider from "./contexts/ApiProvider.tsx";
import TopicQuiz from "./pages/topics/TopicQuiz.tsx";
import QuestionDelete from "./pages/questions/QuestionDelete.tsx";
import QuestionEdit from "./pages/questions/QuestionEdit.tsx";

export default () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ApiProvider>
                        <Navigation/>
                        <main className="container">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/topics" element={<TopicIndex/>}/>
                                <Route path="/topics/create" element={<TopicCreate/>}/>
                                <Route path="/topics/:topicId" element={<TopicDetails/>}/>
                                <Route path="/topics/:topicId/edit" element={<TopicEdit/>}/>
                                <Route path="/topics/:topicId/delete" element={<TopicDelete/>}/>
                                <Route path="/topics/:topicId/question" element={<QuestionCreate/>}/>
                                <Route path="/topics/:topicId/quiz" element={<TopicQuiz/>}/>
                                <Route path="/questions/:questionId" element={<QuestionDetail/>}/>
                                <Route path="/questions/:questionId/edit" element={<QuestionEdit/>}/>
                                <Route path="/questions/:questionId/delete" element={<QuestionDelete/>}/>
                            </Routes>
                        </main>
                    </ApiProvider>
                </BrowserRouter>
            </AuthProvider>
        </ToastProvider>
    );
};