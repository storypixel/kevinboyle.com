import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <article style={{ minHeight: '100vh', paddingBottom: '10vh' }}>
            <div style={{ padding: '2rem var(--spacing-container)' }}>
                <Link to="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem'
                }}>
                    ← Back
                </Link>
            </div>

            <div style={{ padding: '0 var(--spacing-container)' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        lineHeight: 1,
                        marginBottom: '4rem',
                        maxWidth: '15ch'
                    }}
                >
                    Building digital products with purpose.
                </motion.h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
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
                            src="/images/profile-kevin.png"
                            alt="Kevin Boyle in Pittsburgh"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '2rem' }}>
                                My name is Kevin Boyle. I am a designer and developer based in San Francisco, working at the intersection of brand and product.
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                With over 8 years of experience, I have helped startups and established companies alike launch products that people love. My approach is rooted in simplicity and a deep understanding of user needs.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                I specialize in design systems, interaction design, and creative development. I believe that the best digital experiences are those that feel natural and effortless.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Services</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.2rem' }}>
                                <li>Art Direction</li>
                                <li>Product Design (UI/UX)</li>
                                <li>Web Development</li>
                                <li>Brand Identity</li>
                                <li>Design Strategy</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Contact</h3>
                            <a href="mailto:hello@kevinboyle.com" style={{ fontSize: '1.2rem', textDecoration: 'underline' }}>
                                hello@kevinboyle.com
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default AboutPage;
