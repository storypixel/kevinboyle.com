import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectDetails } from '../data/projects';
import AppModal from './AppModal';
import './ProjectDetail.css';

// React Six Pack apps - these have interactive demos
const REACT_SIX_PACK_APPS = {
    brewdial: { name: 'BrewDial', url: '/apps/brewdial/index.html' },
    typescale: { name: 'TypeScale', url: '/apps/typescale/index.html' },
    palettepop: { name: 'PalettePop', url: '/apps/palettepop/index.html' },
    atlas: { name: 'Atlas', url: null }, // TypeScript build errors - needs fix
    platemath: { name: 'PlateMath', url: '/apps/platemath/index.html' },
    macromini: { name: 'MacroMini', url: '/apps/macromini/index.html' },
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectDetails[id];
    const reactApp = REACT_SIX_PACK_APPS[id];
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!project) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <h1 style={{ fontSize: '2rem' }}>Project not found</h1>
                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Back to home</Link>
            </div>
        );
    }

    // Split gallery into sections for varied layout
    const heroImage = project.hero;
    const galleryImages = project.gallery || [];
    const firstPair = galleryImages.slice(0, 2);
    const secondPair = galleryImages.slice(2, 4);
    const remainingImages = galleryImages.slice(4);

    return (
        <motion.article
            className="project-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Navigation */}
            <nav className="project-nav">
                <Link to="/" className="nav-name">Kevin Boyle</Link>
                <div className="nav-info">
                    <span>Austin, TX</span>
                    <span>Design Technologist</span>
                </div>
                <div className="nav-links">
                    <a href="mailto:thekevinboyle@gmail.com" className="nav-link">
                        Email <span className="nav-arrow">┐</span>
                    </a>
                    <Link to="/about" className="nav-link">
                        About <span className="nav-arrow">┐</span>
                    </Link>
                    <a href="/kevin-boyle-general-2026.pdf" className="nav-link" target="_blank" rel="noopener noreferrer">
                        CV <span className="nav-arrow">┐</span>
                    </a>
                </div>
            </nav>

            {/* Project Header */}
            <header className="project-header">
                <span className="project-header-year">{project.year}</span>
                <h1 className="project-header-title">{project.title}</h1>
                <p className="project-header-description">{project.description}</p>
                <div className="project-header-role">
                    <div className="project-header-role-label">Role</div>
                    <div className="project-header-role-value">{project.role}</div>
                </div>
            </header>

            {/* Project Content */}
            <div className="project-content">
                {/* Hero Image */}
                {heroImage && (
                    <section className="project-hero-section">
                        <motion.div
                            className={`project-hero-wrapper ${reactApp ? 'project-hero-interactive' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            onClick={reactApp ? () => setIsModalOpen(true) : undefined}
                            style={reactApp ? { cursor: 'pointer' } : undefined}
                        >
                            <img
                                src={heroImage}
                                alt={project.title}
                                className="project-hero-image"
                            />
                            {reactApp && (
                                <div className="project-hero-overlay">
                                    <span className="project-hero-overlay-text">Launch Demo</span>
                                </div>
                            )}
                        </motion.div>
                    </section>
                )}

                {/* Work Description Section */}
                {project.workDescription && (
                    <section className="content-block content-block--dark">
                        <div className="content-block-inner">
                            <div className="content-row">
                                <span className="content-label">Problems</span>
                                <div className="content-main">
                                    <h2 className="content-heading">{project.roleBlurb || project.description}</h2>
                                    <p className="content-text">{project.workDescription}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Section 1 - Light background */}
                {firstPair.length > 0 && (
                    <section className="content-block content-block--light">
                        <div className="content-block-inner">
                            <div className="content-row">
                                <span className="content-label">Work</span>
                                <div className="content-main">
                                    <div className={`gallery-grid ${firstPair.length === 1 ? 'gallery-grid--single' : ''}`}>
                                        {firstPair.map((image, index) => (
                                            <motion.div
                                                key={image}
                                                className="gallery-item"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${project.title} work ${index + 1}`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Section 2 - Dark background */}
                {secondPair.length > 0 && (
                    <section className="content-block content-block--dark">
                        <div className="content-block-inner">
                            <div className="content-row">
                                <span className="content-label">Details</span>
                                <div className="content-main">
                                    <div className={`gallery-grid ${secondPair.length === 1 ? 'gallery-grid--single' : ''}`}>
                                        {secondPair.map((image, index) => (
                                            <motion.div
                                                key={image}
                                                className="gallery-item"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${project.title} detail ${index + 1}`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Remaining Gallery - Light background */}
                {remainingImages.length > 0 && (
                    <section className="content-block content-block--light">
                        <div className="content-block-inner">
                            <div className="content-row">
                                <span className="content-label">More</span>
                                <div className="content-main">
                                    <div className={`gallery-grid ${remainingImages.length === 1 ? 'gallery-grid--single' : ''}`}>
                                        {remainingImages.map((image, index) => (
                                            <motion.div
                                                key={image}
                                                className="gallery-item"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${project.title} additional ${index + 1}`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Footer */}
            <footer className="project-footer">
                <div className="project-footer-left">
                    Designed by Kevin Boyle
                </div>
                <div className="project-footer-center">
                    <span>Senior Design Technologist </span>
                    <a href="mailto:thekevinboyle@gmail.com">Available for Hire</a>
                </div>
                <div className="project-footer-right">
                    © 2025
                </div>
            </footer>

            {/* App Modal for React Six Pack demos */}
            {reactApp && (
                <AppModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    appName={reactApp.name}
                    appUrl={reactApp.url}
                />
            )}
        </motion.article>
    );
};

export default ProjectDetail;
