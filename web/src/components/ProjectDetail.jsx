import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data - in a real app this might come from a CMS or API
const projectData = {
    1: {
        title: 'Sottozero',
        category: 'Web Design / Development',
        image: '#2a2a2a',
        description: 'Sottozero is a premium digital experience designed to showcase the intersection of minimalism and functionality. We focused on creating a seamless user journey through micro-interactions and bold typography.',
        client: 'Sottozero S.r.l',
        year: '2023',
        role: 'Design & Development'
    },
    2: {
        title: 'Dark Mode Aesthetics',
        category: 'UI Kit',
        image: '#1a1a1a',
        description: 'A comprehensive UI kit for modern dark mode interfaces. This project explored the nuances of contrast and accessibility in low-light environments.',
        client: 'Internal Project',
        year: '2023',
        role: 'Product Design'
    },
    3: {
        title: 'Radius',
        category: 'Branding',
        image: '#222',
        description: 'Radius is a fintech startup looking to disrupt the lending market. We created a brand identity that feels trustworthy yet innovative, using circular motifs to represent continuity.',
        client: 'Radius Finance',
        year: '2023',
        role: 'Branding & Identity'
    },
    4: {
        title: 'Purchase Power',
        category: 'Campaign',
        image: '#f5f5f0',
        textColor: '#000',
        description: 'A marketing campaign focused on consumer empowerment. The visual language uses bright colors and bold statements to drive engagement.',
        client: 'Consumer Watch',
        year: '2024',
        role: 'Art Direction'
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectData[id];

    if (!project) return <div>Project not found</div>;

    const textColor = project.textColor || '#fff';

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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    height: '60vh',
                    width: 'calc(100% - 2 * var(--spacing-container))',
                    margin: '0 auto',
                    background: project.image,
                    borderRadius: '16px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '4rem'
                }}
            >
                <h1 style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                    margin: 0,
                    color: textColor
                }}>
                    {project.title}
                </h1>
            </motion.div>

            <div style={{
                padding: '6rem var(--spacing-container)',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '4rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Client</h3>
                        <p>{project.client}</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Role</h3>
                        <p>{project.role}</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Year</h3>
                        <p>{project.year}</p>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.6, maxWidth: '40ch' }}>
                        {project.description}
                    </h2>

                    {/* Gallery Placeholders */}
                    <div style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ width: '100%', aspectRatio: '16/9', background: '#1a1a1a', borderRadius: '8px' }} />
                        <div style={{ width: '100%', aspectRatio: '16/9', background: '#1a1a1a', borderRadius: '8px' }} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;
