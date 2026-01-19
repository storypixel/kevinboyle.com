import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AppModal = ({ isOpen, onClose, appName, appUrl }) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                    }}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.9)',
                            backdropFilter: 'blur(8px)',
                        }}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '1200px',
                            height: '85vh',
                            background: '#1a1a1a',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            background: 'var(--bg-color)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <span style={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'var(--text-color)',
                                }}>
                                    {appName}
                                </span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    padding: '0.25rem 0.5rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '4px',
                                }}>
                                    Interactive Demo
                                </span>
                            </div>

                            <button
                                onClick={onClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '36px',
                                    height: '36px',
                                    background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--text-color)';
                                    e.currentTarget.style.color = 'var(--bg-color)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* App Content */}
                        <div style={{
                            flex: 1,
                            position: 'relative',
                            background: '#fff',
                        }}>
                            {appUrl ? (
                                <iframe
                                    src={appUrl}
                                    title={appName}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    background: 'var(--bg-color)',
                                    color: 'var(--text-secondary)',
                                    gap: '1rem',
                                }}>
                                    <div style={{ fontSize: '3rem', opacity: 0.3 }}>🚀</div>
                                    <p style={{ fontSize: '1.1rem' }}>Demo coming soon</p>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                        This app is being prepared for deployment
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AppModal;
