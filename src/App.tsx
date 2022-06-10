import React from 'react';
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";

/* Styles */
import './styles/app.css';

/* Pages */
import Index from './pages/Index';
import Projects from './pages/Projects';
import Stories from './pages/Stories';
import About from './pages/About';

/* Components */
import Navigation from './components/Navigation';
import PageContent from './components/containers/Content';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

/* Images */
import Logo from "./static/logo.png";


const App = () => {



    return (
        <BrowserRouter>
            <header className="container">
                <div className="logo">
                    <NavLink to="/">
                        <img src={Logo} alt="Logo" />
                    </NavLink>
                </div>
                <Navigation />
            </header>
            <PageContent>
                <Routes>

                    {/* Index Routing */}
                    <Route index element={<Index />} />

                    {/* About Routing */}
                    <Route path="/projects" element={<Projects />} />

                    {/* Stories Routing */}
                    <Route path="/Stories" element={<Stories />} />

                    {/* Stories Routing */}
                    <Route path="/About" element={<About />} />

                    {/* Any* Routing (404 Not Found) */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </PageContent>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
