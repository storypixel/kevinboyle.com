import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Work.css';

const projects = [
    {
        id: 1,
        title: 'Sottozero',
        category: 'Web Design / Development',
        size: 'full',
        image: '/images/project-sottozero.jpg',
        color: '#2a2a2a'
    },
    {
        id: 2,
        title: 'Dark Mode Aesthetics',
        category: 'UI Kit',
        size: 'half',
        image: '/images/project-darkmode.jpg',
        color: '#1a1a1a'
    },
    {
        id: 3,
        title: 'Radius',
        category: 'Branding',
        size: 'half',
        image: '/images/project-radius.jpg',
        color: '#222'
    },
    {
        id: 4,
        title: 'Purchase Power',
        category: 'Campaign',
        size: 'full',
        image: '/images/project-purchasepower.jpg',
        color: '#f5f5f0'
    }
];

const Work = () => {
    return (
        <section className="work-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '400' }}>Selected Work</h2>
                <span style={{ color: 'var(--text-secondary)' }}>2023 — 2024</span>
            </div>

            <div className="work-grid">
                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        to={`/work/${project.id}`}
                        style={{ display: 'block' }}
                    >
                        <motion.div
                            className={`project-card ${project.size === 'full' ? 'full-width' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{ backgroundColor: project.color }}
                        >
                            <div className="project-image-container">
                                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div className="project-info">
                                <h3 className="project-title" style={{ color: project.color === '#f5f5f0' ? '#000' : '#fff' }}>
                                    {project.title}
                                </h3>
                                <p className="project-category" style={{ color: project.color === '#f5f5f0' ? '#666' : '#888' }}>
                                    {project.category}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Work;
