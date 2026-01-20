import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <article style={{ minHeight: '100vh', paddingBottom: '10vh' }}>
            {/* Navigation - matches global grid: 80px 280px 1fr 160px */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1.5rem var(--spacing-container)',
                display: 'grid',
                gridTemplateColumns: '80px 280px 1fr 160px',
                gap: '2rem',
                alignItems: 'start',
                backgroundColor: 'var(--bg-color)',
            }}>
                <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-color)', gridColumn: '1 / 3', textDecoration: 'none' }}>Kevin Boyle</Link>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.15rem', gridColumn: '3' }}>
                    <span>Austin, TX</span>
                    <span>Design Technologist</span>
                </div>
                <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end', fontSize: '0.9rem', gridColumn: '4' }}>
                    <a href="mailto:thekevinboyle@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                        Email <span style={{ fontSize: '0.85rem' }}>┐</span>
                    </a>
                    <Link to="/about" style={{ color: 'var(--text-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                        About <span style={{ fontSize: '0.85rem' }}>┐</span>
                    </Link>
                    <a href="/kevin-boyle-general-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                        CV <span style={{ fontSize: '0.85rem' }}>┐</span>
                    </a>
                </div>
            </nav>

            <div style={{ padding: '8rem var(--spacing-container) 0' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        lineHeight: 1.1,
                        marginBottom: '4rem',
                        maxWidth: '18ch',
                        fontWeight: 400,
                    }}
                >
                    Context engineering is the art of shaping AI behavior.
                </motion.h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{
                            width: '100%',
                            aspectRatio: '3/4',
                            background: '#222',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src="/images/scraped/homepage/kevin-photo.jpg"
                            alt="Kevin Boyle"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                I bring a decade of design experience to this emerging discipline. From building design systems at IBM to crafting user experiences at startups, I've learned that the best interfaces disappear.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Now I apply those principles to human-AI collaboration, designing the invisible architectures that shape how machines understand intent.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Based in Austin, TX. Currently exploring the frontier of AI-native interfaces and context-aware systems.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Expertise</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1rem' }}>
                                <li>Context Engineering</li>
                                <li>Design Systems</li>
                                <li>Human-AI Collaboration</li>
                                <li>Product Design (UI/UX)</li>
                                <li>Front-end Development</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Contact</h3>
                            <a href="mailto:thekevinboyle@gmail.com" style={{ fontSize: '1rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                                thekevinboyle@gmail.com
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Photo Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                    }}
                >
                    <div style={{
                        aspectRatio: '4/3',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#222',
                    }}>
                        <img
                            src="/images/scraped/homepage/kevin-roast.png"
                            alt="Kevin Boyle"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{
                        aspectRatio: '4/3',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#222',
                    }}>
                        <img
                            src="/images/scraped/homepage/kevin-tree-film.png"
                            alt="Kevin Boyle"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </motion.div>
            </div>
        </article>
    );
};

export default AboutPage;
