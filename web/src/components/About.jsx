import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section style={{
            padding: '10vh var(--spacing-container)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            borderTop: '1px solid #222',
            marginTop: '4rem'
        }}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    About Me
                </h2>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.2', marginBottom: '2rem' }}>
                    Hey, I'm Kevin.
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '40ch', marginBottom: '2rem' }}>
                    I'm a digital product designer focusing on building brands and websites for tech companies. I believe in clarity, purpose, and aesthetics that last.
                </p>
                <Link to="/about" style={{
                    display: 'inline-block',
                    borderBottom: '1px solid #fff',
                    paddingBottom: '4px',
                    fontSize: '0.9rem'
                }}>
                    Read more
                </Link>
            </motion.div>

            <motion.div
                style={{
                    width: '100%',
                    aspectRatio: '1',
                    background: '#222',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <img
                    src="/images/profile-kevin.png"
                    alt="Kevin Boyle"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </motion.div>
        </section>
    );
};

export default About;
