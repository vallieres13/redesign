import React from 'react';
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";

/* Styles */
import './styles/app.css';

/* Pages */
import Index from './pages/Index';
import Labs from './pages/Labs';
import Stories from './pages/Stories';
import About from './pages/About';
import Climate from "./pages/Climate";
import Article from "./pages/Article";
import Hire from "./pages/Hire";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Imprint from './pages/Imprint';

/* Components */
import Navigation from './components/Navigation';
import PageContent from './components/containers/Content';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

/* Images */
import Logo from "./static/logo.svg";

const App = () => {

    /* GSAP Configuration */
    gsap.config({
        autoSleep: 60,
        force3D: false,
        nullTargetWarn: false
    });


    /* Move the cursor following circle */
    let cursorInit = false;
    let bloated = false;
    let mouseFadeTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
        // Reset mouse fade timeout on mouse wake
        clearTimeout(mouseFadeTimeout);

        let circle = document.querySelector('.circle') as HTMLDivElement;

        if(!cursorInit) {
            gsap.to(circle, {
                autoAlpha: 0,
                x: e.pageX,
                y: e.pageY,
                transitionDuration: 0,
                transitionTimingFunction: 'ease',
                duration: .05,
                onComplete: () => {
                    cursorInit = true;
                }
            });
            return;
        }

        gsap.to(circle, {
            autoAlpha: 1,
            x: e.pageX,
            y: e.pageY
        });

        /*
        * If user doesn't move their mose for a while, hide the circle.
        * This prevents it from moving weirdly when scrolling.
        */
        mouseFadeTimeout = setTimeout(() => {
            cursorInit = false;
            gsap.to(circle, {
                autoAlpha: (bloated ? 1 : 0)
            });
        }, 100);

    }

    document.body.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
        if(!(e.target instanceof HTMLAnchorElement)) return;

        let circle = document.querySelector('.circle') as HTMLDivElement;
        const bloatScale = (e.target.classList.contains('small') ? 4 : 10)

        bloated = true;
        gsap.to(circle, {
            scale: bloatScale,
            duration: .4,
            ease: 'power3'
        });

        const makeSmaller = () => {
            gsap.to(circle, {
                scale: 1,
                duration: .4,
                ease: 'power3'
            });
            bloated = false;
        };

        e.target.addEventListener('mouseleave', makeSmaller);
    }

    document.body.addEventListener('mouseover', handleMouseOver);

    return (
        <BrowserRouter>
            <div className="circle"></div>
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
                    <Route path="/Labs" element={<Labs />} />

                    {/* Stories Routing */}
                    <Route path="/Stories" element={<Stories />} />

                    {/* About Routing */}
                    <Route path="/About" element={<About />} />

                    {/* Future & Climate Routing */}
                    <Route path="/Future" element={<Climate />} />

                    {/* Article Routing */}
                    <Route path="/Article/:id" element={<Article />} />

                    {/* Hire Me Routing */}
                    <Route path="/Hire" element={<Hire />} />

                    {/* Privacy Policy Routing */}
                    <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />

                    {/* Imprint Routing */}
                    <Route path="/Imprint" element={<Imprint />} />

                    {/* Any* Routing (404 Not Found) */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </PageContent>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
