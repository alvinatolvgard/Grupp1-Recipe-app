import './Footer.css';
import { Link } from 'react-router-dom';

/**
 * Footer-komponent med logga, navigering och sociala medier
 * @author Albrim
 * @returns {JSX.Element} - footer med tre kolumner och copyright
 */
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">

                    {/* Vänster: Logga + beskrivning */}
                    <div className="footer-brand">
                        <h2 className="footer-logo">CodeCuisine</h2>
                        <p className="footer-desc">
                            A curated collection of recipes for the modern home cook.
                            Discover new flavors, master classic techniques, and create
                            memorable meals.
                        </p>
                    </div>

                    {/* Mitten: Explore-länkar */}
                    <div className="footer-nav">
                        <h3 className="footer-heading">Explore</h3>
                        <ul className="footer-links">
                            <li><Link to="/">All Recipes</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Höger: Sociala medier */}
                    <div className="footer-social">
                        <h3 className="footer-heading">Follow Us</h3>
                        <div className="social-icons">

                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <div className="social-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                                    </svg>
                                </div>
                            </a>

                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <div className="social-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </div>
                            </a>

                            {/* Twitter/X */}
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <div className="social-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                </div>
                            </a>

                        </div>
                    </div>
                </div>

                {/* Avdelare + copyright */}
                <div className="footer-bottom">
                    <hr className="footer-divider" />
                    <p className="footer-copyright">
                        © 2026 CodeCuisine. Crafted with care for home cooks everywhere.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
