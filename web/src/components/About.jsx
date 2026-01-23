import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const sideProjects = [
        { name: 'Bandcamp', url: 'https://weareallgonners.bandcamp.com/' },
        { name: 'Transgressive Podcast', url: 'https://transgressive.libsyn.com/' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kevinboyle/' },
    ];

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
                    About
                </h2>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.2', marginBottom: '2rem' }}>
                    Context engineering is the art of shaping AI behavior.
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '45ch', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    I bring a decade of design experience to this emerging discipline. From building design systems at IBM to crafting user experiences at startups, I've learned that the best interfaces disappear.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '45ch', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Now I apply those principles to human-AI collaboration, designing the invisible architectures that shape how machines understand intent.
                </p>

                <div style={{ marginTop: '2rem' }}>
                    <p style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                    }}>
                        More Work
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {sideProjects.map((project) => (
                            <a
                                key={project.name}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: '0.9rem',
                                    borderBottom: '1px solid #444',
                                    paddingBottom: '4px',
                                    transition: 'border-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.borderColor = '#fff'}
                                onMouseLeave={(e) => e.target.style.borderColor = '#444'}
                            >
                                {project.name}
                            </a>
                        ))}
                    </div>
                </div>
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
                    src="/images/scraped/homepage/kevin-photo.jpg"
                    alt="Kevin Boyle"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </motion.div>
        </section>
    );
};

export default About;
