import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = [
    {
        id: '01',
        title: 'Power',
        items: [
            'Creative problem solving',
            'Critical design thinking',
            'Process development'
        ],
        tags: ['Ops', 'QC', 'Process']
    },
    {
        id: '02',
        title: 'Focus',
        items: [
            'Concept development',
            'Team leader',
            'Design systems',
            'Product marketing'
        ],
        tags: ['Systems', 'Product', 'Flows']
    },
    {
        id: '03',
        title: 'Lekker',
        items: [
            'Sketching',
            'Brainstorming',
            'Communication with stakeholders'
        ],
        tags: ['Scribble', 'Concepts', 'Comms']
    }
];

const ServiceItem = ({ service, isActive, onToggle }) => {
    return (
        <div
            style={{
                borderBottom: '1px solid #ddd',
                background: isActive ? '#f2f2f2' : 'transparent',
                transition: 'background 0.3s ease'
            }}
        >
            <button
                onClick={onToggle}
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr auto',
                    alignItems: 'center',
                    padding: '2rem 1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#111',
                    textAlign: 'left'
                }}
            >
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 500
                }}>
                    {service.id}
                </span>
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 500
                }}>
                    {service.title}
                </span>
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    lineHeight: 1
                }}>
                    {isActive ? '×' : '+'}
                </span>
            </button>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            padding: '0 1rem 2rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr auto',
                        }}>
                            <div></div>
                            <div>
                                <ul style={{
                                    listStyle: 'none',
                                    margin: '0 0 2rem 0',
                                    padding: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem'
                                }}>
                                    {service.items.map((item, index) => (
                                        <li key={index} style={{
                                            fontSize: '1.1rem',
                                            color: '#111'
                                        }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    {service.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: '0.4rem 0.75rem',
                                                background: '#ddd',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                color: '#666'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Services = () => {
    const [activeId, setActiveId] = useState('01');

    const handleToggle = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section style={{
            padding: '6rem var(--spacing-container)',
            background: '#f2f2f2',
            color: '#111'
        }}>
            <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 500,
                marginBottom: '3rem'
            }}>
                Services
            </h2>
            <div style={{ borderTop: '1px solid #ddd' }}>
                {servicesData.map((service) => (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        isActive={activeId === service.id}
                        onToggle={() => handleToggle(service.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Services;
