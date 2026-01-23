import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ZoomableTreemap from './ZoomableTreemap';

const ExplorePage = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/work/${projectId}`);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Full screen treemap */}
      <ZoomableTreemap onProjectClick={handleProjectClick} />

      {/* Overlay navigation - matches site style */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.5rem var(--spacing-container)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-color)',
            textDecoration: 'none',
            pointerEvents: 'auto',
          }}
        >
          Kevin Boyle
        </Link>

        <div style={{
          display: 'flex',
          gap: '2.5rem',
          fontSize: '0.9rem',
          pointerEvents: 'auto',
        }}>
          <a href="mailto:thekevinboyle@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Email <span style={{ fontSize: '0.85rem' }}>┐</span>
          </a>
          <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            About <span style={{ fontSize: '0.85rem' }}>┐</span>
          </Link>
          <a href="/kevin-boyle-general-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            CV <span style={{ fontSize: '0.85rem' }}>┐</span>
          </a>
        </div>
      </motion.nav>
    </div>
  );
};

export default ExplorePage;
