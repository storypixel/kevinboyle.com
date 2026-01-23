import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`main-nav ${scrolled ? 'nav-scrolled' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Left: Name */}
            <Link to="/" className="nav-name">
                Kevin Boyle
            </Link>

            {/* Center: Location & Role */}
            <div className="nav-info">
                <span>Austin, TX</span>
                <span>Design Technologist</span>
            </div>

            {/* Right: Navigation Links */}
            <div className="nav-links">
                <a href="mailto:thekevinboyle@gmail.com" className="nav-link">
                    Email <span className="nav-arrow">┐</span>
                </a>
                <Link to="/about" className="nav-link">
                    About <span className="nav-arrow">┐</span>
                </Link>
                <a href="/kevin-boyle-general-2026.pdf" className="nav-link" target="_blank" rel="noopener noreferrer">
                    CV <span className="nav-arrow">┐</span>
                </a>
            </div>
        </motion.nav>
    );
};

export default Navigation;
