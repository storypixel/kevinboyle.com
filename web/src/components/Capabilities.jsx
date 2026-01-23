import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities } from '../data/capabilities';

const Capabilities = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                    fontSize: '2rem',
                    fontWeight: '400',
                    marginBottom: '4rem',
                }}
            >
                What I Do
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {capabilities.map((cap, index) => (
                    <motion.div
                        key={cap.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        style={{
                            borderBottom: '1px solid #222',
                            paddingTop: '2rem',
                            paddingBottom: '2rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr',
                                gap: '2rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleItem(index)}
                        >
                            <span style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                            }}>
                                {cap.number}
                            </span>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '500',
                                    }}>
                                        {cap.title}
                                    </h3>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        color: 'var(--text-secondary)',
                                        transition: 'transform 0.3s ease',
                                        transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                    }}>
                                        +
                                    </span>
                                </div>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{
                                                color: 'var(--text-secondary)',
                                                marginTop: '1.5rem',
                                                maxWidth: '50ch',
                                                lineHeight: '1.6',
                                            }}>
                                                {cap.description}
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                gap: '0.75rem',
                                                marginTop: '1.5rem',
                                                flexWrap: 'wrap',
                                            }}>
                                                {cap.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        style={{
                                                            fontSize: '12px',
                                                            padding: '0.5rem 1rem',
                                                            background: '#1a1a1a',
                                                            borderRadius: '100px',
                                                            color: 'var(--text-secondary)',
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Capabilities;
