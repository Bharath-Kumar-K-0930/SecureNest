import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Box as Nest, Lock, Rocket, Users, Globe, Github, Linkedin, Mail, ExternalLink, Code } from 'lucide-react';

const Landing: React.FC = () => {
    return (
        <div className="landing-container">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="logo-container">
                    <Shield className="logo-icon-shield" />
                    <Nest className="logo-icon-nest" />
                    <span className="logo-text">SecureNest</span>
                </div>
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
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo-container">
                            <Shield className="logo-icon-shield-small" />
                            <span className="logo-text">SecureNest</span>
                        </div>
                        <p>Building the future of secure collaboration.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Connect with Developer</h4>
                        <div className="social-links">
                            <a href="https://github.com/Bharath-Kumar-K-0930" target="_blank" rel="noopener noreferrer">
                                <Github size={20} /> GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/bharath-kumar-k-b35ba0304" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={20} /> LinkedIn
                            </a>
                            <a href="https://leetcode.com/u/Bharath_Kumar_K_91/" target="_blank" rel="noopener noreferrer">
                                <Code size={20} /> LeetCode
                            </a>
                            <a href="https://bharath-kumar-k-0930.github.io/My_Portfolio_website/" target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={20} /> Portfolio
                            </a>
                            <a href="mailto:bharathkumatkbk10@gmail.com">
                                <Mail size={20} /> Email
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} SecureNest. Designed by Bharath Kumar K.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
