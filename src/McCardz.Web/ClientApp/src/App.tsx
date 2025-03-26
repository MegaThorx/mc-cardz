import {BrowserRouter, Route, Routes} from "react-router";
import Navigation from "./components/Navigation.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import TopicsIndex from "./pages/TopicsIndex.tsx";
import AuthProvider from "./contexts/AuthProvider.tsx";

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
                    <Route path="/topics" element={<TopicsIndex />} />
                </Routes>
            </main>
        </BrowserRouter>
    </AuthProvider>
);  
};