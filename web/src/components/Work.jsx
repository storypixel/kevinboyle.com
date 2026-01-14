import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Work.css';

const projects = [
    {
        id: 1,
        title: 'Radius',
        category: 'Product Design',
        size: 'full',
        image: '/images/project-radius.jpg',
        color: '#1a1a1a'
    },
    {
        id: 2,
        title: 'Textline',
        category: 'Product Design',
        size: 'half',
        image: '/images/textline-screencap.png',
        color: '#ffffff'
    },
    {
        id: 3,
        title: 'Textedly',
        category: 'Product Design',
        size: 'half',
        image: '/images/textedly-screencap.png',
        color: '#ffffff'
    },
    {
        id: 4,
        title: 'Mozeo',
        category: 'Product Design',
        size: 'full',
        image: '/images/mozeo-screencap.png',
        color: '#ffffff'
    },
    {
        id: 5,
        title: 'Crypto',
        category: 'NFT Art',
        size: 'half',
        image: '/images/nft-3.png',
        color: '#f5e642'
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
                                <h3 className="project-title" style={{ color: ['#f5f5f0', '#ffffff', '#f5e642'].includes(project.color) ? '#000' : '#fff' }}>
                                    {project.title}
                                </h3>
                                <p className="project-category" style={{ color: ['#f5f5f0', '#ffffff', '#f5e642'].includes(project.color) ? '#666' : '#888' }}>
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
