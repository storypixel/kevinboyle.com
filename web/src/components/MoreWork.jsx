import React, { useState } from 'react';
import { motion } from 'framer-motion';

const moreWorkItems = [
    {
        id: '01',
        title: 'Bandcamp',
        description: 'All of the music that I produce.',
        url: 'https://kevinboyle.bandcamp.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 18.75l7.437-13.5H24l-7.437 13.5H0z"/>
            </svg>
        )
    },
    {
        id: '02',
        title: 'Transgressive podcast',
        description: 'Conversations about creativity and culture.',
        url: 'https://transgressive.fm',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
        )
    },
    {
        id: '03',
        title: 'LinkedIn',
        description: 'Professional profile and connections.',
        url: 'https://linkedin.com/in/kevinboyle',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
    }
];

const MoreWorkItem = ({ item, isActive, onHover }) => {
    return (
        <motion.a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={() => onHover(null)}
            style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                alignItems: 'start',
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #333',
                background: isActive ? '#e8e8e8' : 'transparent',
                color: isActive ? '#000' : '#fff',
                textDecoration: 'none',
                transition: 'background 0.3s ease, color 0.3s ease'
            }}
        >
            <span style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                paddingTop: '0.2rem'
            }}>
                {item.id}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {item.icon}
                    <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.title}</span>
                </div>
                {isActive && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            color: '#666',
                            fontSize: '1rem',
                            margin: 0
                        }}
                    >
                        {item.description}
                    </motion.p>
                )}
            </div>
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginTop: '0.2rem' }}
            >
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
        </motion.a>
    );
};

const MoreWork = () => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <section style={{
            padding: '6rem var(--spacing-container)',
            borderTop: '1px solid #222'
        }}>
            <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 500,
                marginBottom: '3rem'
            }}>
                More work
            </h2>
            <div style={{ borderTop: '1px solid #333' }}>
                {moreWorkItems.map((item) => (
                    <MoreWorkItem
                        key={item.id}
                        item={item}
                        isActive={activeItem === item.id}
                        onHover={setActiveItem}
                    />
                ))}
            </div>
        </section>
    );
};

export default MoreWork;
