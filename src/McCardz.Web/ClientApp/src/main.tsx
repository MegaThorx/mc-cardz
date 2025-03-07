import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from "./pages/Home.tsx";
import TopicsIndex from "./pages/TopicsIndex.tsx";
import Navigation from "./components/Navigation.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Navigation />
        <main>
            <div className="relative isolate overflow-hidden pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/topics" element={<TopicsIndex />} />
                </Routes>
            </div>
        </main>
    </BrowserRouter>
)
