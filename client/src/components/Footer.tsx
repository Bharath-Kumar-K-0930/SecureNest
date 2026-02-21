import React from 'react';
import { Github, Linkedin, Mail, Code, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
    minimal?: boolean;
}

const Footer: React.FC<FooterProps> = ({ minimal = false }) => {
    const year = new Date().getFullYear();

    if (minimal) {
        return (
            <footer className="footer-minimal">
                <div className="footer-minimal-content">
                    <p>&copy; {year} SecureNest. Developed by Bharath Kumar K.</p>
                    <div className="social-icons-minimal">
                        <a href="https://github.com/Bharath-Kumar-K-0930" target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={16} /></a>
                        <a href="https://www.linkedin.com/in/bharath-kumar-k-b35ba0304" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={16} /></a>
                        <a href="mailto:bharathkumatkbk10@gmail.com" title="Email"><Mail size={16} /></a>
                        <a href="https://bharath-kumar-k-0930.github.io/My_Portfolio_website/" target="_blank" rel="noopener noreferrer" title="Portfolio"><ExternalLink size={16} /></a>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <Logo size={28} />
                    <p>Building the future of secure collaboration.</p>
                </div>
                <div className="footer-links">
                    <h4>Connect with Developer</h4>
                    <div className="social-links">
                        <a href="https://github.com/Bharath-Kumar-K-0930" target="_blank" rel="noopener noreferrer"><Github size={20} /> GitHub</a>
                        <a href="https://www.linkedin.com/in/bharath-kumar-k-b35ba0304" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /> LinkedIn</a>
                        <a href="https://leetcode.com/u/Bharath_Kumar_K_91/" target="_blank" rel="noopener noreferrer"><Code size={20} /> LeetCode</a>
                        <a href="https://bharath-kumar-k-0930.github.io/My_Portfolio_website/" target="_blank" rel="noopener noreferrer"><ExternalLink size={20} /> Portfolio</a>
                        <a href="mailto:bharathkumatkbk10@gmail.com"><Mail size={20} /> Email</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {year} SecureNest. Designed by Bharath Kumar K.</p>
            </div>
        </footer>
    );
};

export default Footer;
