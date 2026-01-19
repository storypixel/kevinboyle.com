import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const Experience = () => {
    return (
        <section style={{
            padding: '10vh var(--spacing-container)',
            borderTop: '1px solid #222',
        }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '3rem',
                }}
            >
                Work Experience
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: '2rem',
                            paddingTop: '1.5rem',
                            paddingBottom: '1.5rem',
                            borderBottom: index < experience.length - 1 ? '1px solid #222' : 'none',
                        }}
                    >
                        <div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '500',
                                marginBottom: '0.25rem',
                            }}>
                                {exp.role}
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                            }}>
                                {exp.company}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{
                                fontSize: '12px',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.25rem',
                            }}>
                                Year
                            </p>
                            <p style={{
                                fontSize: '1rem',
                            }}>
                                {exp.years}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
