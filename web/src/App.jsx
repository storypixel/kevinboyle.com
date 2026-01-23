import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AboutPage from './components/AboutPage';
import ExplorePage from './components/ExplorePage';
import ScrollToTop from './components/ScrollToTop';

function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <Work />
      <Capabilities />
      <About />
      <Experience />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </main>
      </ReactLenis>
    </Router>
  );
}

export default App;
