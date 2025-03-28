import {BrowserRouter, Route, Routes} from "react-router";
import Navigation from "./components/Navigation.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import TopicIndex from "./pages/TopicIndex.tsx";
import AuthProvider from "./contexts/AuthProvider.tsx";
import TopicDetails from "./pages/TopicDetails.tsx";

export default () => {
  return (
    <AuthProvider>
        <BrowserRouter>
            <Navigation />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/topics" element={<TopicIndex />} />
                    <Route path="/topics/:topicId" element={<TopicDetails />} />
                </Routes>
            </main>
        </BrowserRouter>
    </AuthProvider>
);  
};