import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const projectData = {
    1: {
        title: 'Radius',
        category: 'Product Design',
        heroImage: '/images/project-radius.jpg',
        description: 'Radius is a B2B data intelligence platform providing businesses with accurate contact and company data. I led the design of marketing pages, the style guide system, and interactive data visualization experiences.',
        client: 'Radius Intelligence',
        year: '2018',
        role: 'Product Design',
        gallery: [
            '/images/radius/5bcecb67a8474991c15c8f34_test-drive-01.png',
            '/images/radius/5bcecab7969f00dfd003b5bc_Screen-Shot-2018-03-22-at-11.03.19-AM-p-1600.png',
            '/images/radius/5bd0b4002b661f0895a0a664_Screen-Shot-2018-10-24-at-12.52.49-PM-p-1600_1.png',
            '/images/radius/5bd0b42a35f0c5e30b706c9c_Screen-Shot-2018-10-24-at-12.55.24-PM-p-1600.png'
        ]
    },
    2: {
        title: 'Textline',
        category: 'Product Design',
        heroImage: '/images/textline-screencap.png',
        textColor: '#000',
        description: 'Textline is a secure business texting platform built for modern customer support, sales, and marketing teams. I worked on the product design, creating intuitive interfaces for team collaboration and customer communication.',
        client: 'Textline',
        year: '2020',
        role: 'Product Design',
        gallery: [
            '/images/textline/Screenshot-2025-08-15-at-11.27.52.png',
            '/images/textline/Screenshot-2025-08-15-at-11.29.32.png'
        ]
    },
    3: {
        title: 'Textedly',
        category: 'Product Design',
        heroImage: '/images/textedly-screencap.png',
        textColor: '#000',
        description: 'Textedly is an SMS marketing platform that helps businesses send bulk text messages to their customers. I designed the user experience for campaign creation, contact management, and analytics dashboards.',
        client: 'Textedly',
        year: '2019',
        role: 'Product Design',
        gallery: [
            '/images/textedly-screencap.png'
        ]
    },
    4: {
        title: 'Mozeo',
        category: 'Product Design',
        heroImage: '/images/mozeo-screencap.png',
        textColor: '#000',
        description: 'Mozeo is a versatile SMS marketing solution serving restaurants, retail, ecommerce, and nonprofits. I led the redesign of their marketing website and product interfaces to improve conversion and user engagement.',
        client: 'Mozeo',
        year: '2021',
        role: 'Product Design',
        gallery: [
            '/images/mozeo-01.png',
            '/images/mozeo-02.png',
            '/images/mozeo-03.png',
            '/images/mozeo-04.png'
        ]
    },
    5: {
        title: 'Crypto',
        category: 'NFT Art',
        heroImage: '/images/nft-3.png',
        description: 'A collection of generative NFT artwork exploring digital identity and vibrant aesthetics. Each piece combines algorithmic generation with hand-crafted elements.',
        client: 'Personal Project',
        year: '2022',
        role: 'Art Direction',
        gallery: [
            '/images/nft-3.png',
            '/images/nft-4.png',
            '/images/nft-10.png'
        ]
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
                    borderRadius: '16px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '4rem',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={project.heroImage}
                    alt={project.title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
                    zIndex: 1
                }} />
                <h1 style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                    margin: 0,
                    color: '#fff',
                    position: 'relative',
                    zIndex: 2
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

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {project.gallery.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            display: 'block'
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;
