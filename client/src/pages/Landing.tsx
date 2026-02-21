import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Rocket, Users, Globe } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
    return (
        <div className="landing-container">
            {/* Navigation */}
            <nav className="landing-nav">
                <Logo size={36} />
                <div className="nav-links">
                    <Link to="/login" className="nav-btn-secondary">Login</Link>
                    <Link to="/register" className="nav-btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Secure Your Tasks, <br />
                        <span className="gradient-text">Empower Your Nest.</span>
                    </h1>
                    <p className="hero-subtitle">
                        The world's most secure productivity platform.
                        Managing roles, privacy, and team efficiency in one encrypted space.
                    </p>
                    <div className="hero-btns">
                        <Link to="/register" className="cta-btn-primary">Start for Free</Link>
                        <a href="https://securenest-f56j.onrender.com/api-docs" target="_blank" rel="noopener noreferrer" className="cta-btn-secondary">
                            View API Docs
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="abstract-shape-1"></div>
                    <div className="abstract-shape-2"></div>
                    <div className="visual-card-glass">
                        <Lock className="visual-icon" size={48} />
                        <h3>AES-256 Encryption</h3>
                        <p>Your data is shielded with military-grade security.</p>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Everything you need for security</h2>
                    <p>Built for developers, loved by teams.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <Users className="feature-icon" />
                        <h3>RBAC Management</h3>
                        <p>Granular role-based access control for Admins and Users.</p>
                    </div>
                    <div className="feature-card">
                        <Rocket className="feature-icon" />
                        <h3>Scalable Infrastructure</h3>
                        <p>Built with Node.js and Prisma, ready to handle millions of tasks.</p>
                    </div>
                    <div className="feature-card">
                        <Globe className="feature-icon" />
                        <h3>Global Availability</h3>
                        <p>Fully deployed on Render and Vercel with automated health checks.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Landing;
