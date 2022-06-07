import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Styles */
import './styles/app.css';

/* Pages */
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';

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
                    <a href="#" onClick={() => window.location.reload()}>
                        <img src={Logo} alt="Logo" />
                    </a>
                </div>
                <Navigation />
            </header>
            <PageContent>
                <Routes>

                    {/* Index Routing */}
                    <Route index element={<Index />} />

                    {/* Portfolio Routing */}
                    <Route path="/portfolio" element={<Portfolio />} />

                    {/* Any* Routing (404 Not Found) */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </PageContent>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
