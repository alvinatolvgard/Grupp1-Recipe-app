import { Link } from 'react-router-dom';
import { ChefHat, Heart, BookOpen, Users } from 'lucide-react';
import './About.css';

/**
 * About-sida med information om CodeCuisine
 * @author Albrim
 * @returns {JSX.Element} - About-sida med hero, story, värderingar och CTA
 */
function About() {
    return (
        <main className="about-page">

            {/* ─── Hero-sektionen ─── */}
            <section className="about-hero">
                <p className="about-label">ABOUT US</p>
                <h1 className="about-title">Where Passion Meets the Plate</h1>
                <p className="about-subtitle">
                    We believe that cooking is an art form, a way to express love, and a
                    journey of discovery. Every recipe we share is crafted with care
                    and tested with devotion.
                </p>
            </section>

            {/* ─── Our Story ─── */}
            <section className="about-story-wrapper">
                <div className="about-story">
                    <h2>Our Story</h2>
                    <p>
                        CodeCuisine was born from a simple idea: that great food should be accessible to
                        everyone, regardless of skill level. We started in a small kitchen with big dreams,
                        testing and refining recipes until they were perfect.
                    </p>
                    <p>
                        Today, we're a community of food lovers, home cooks, and culinary enthusiasts who
                        believe that the best meals are the ones shared with the people you love. Our
                        recipes blend tradition with innovation, comfort with creativity.
                    </p>
                    <p>
                        Each recipe is more than just a list of ingredients and instructions—it's an invitation
                        to slow down, savor the process, and create something beautiful with your own hands.
                    </p>
                </div>
            </section>

            {/* ─── What We Stand For ─── */}
            <section className="about-values">
                <h2 className="about-values-title">What We Stand For</h2>
                <div className="about-values-grid">

                    <div className="value-card">
                        <div className="value-icon">
                            <ChefHat size={28} strokeWidth={1.5} />
                        </div>
                        <h3>Quality First</h3>
                        <p>Every recipe is tested multiple times to ensure perfect results in your kitchen.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">
                            <Heart size={28} strokeWidth={1.5} />
                        </div>
                        <h3>Made with Love</h3>
                        <p>Cooking is our passion, and we pour our hearts into every dish we create.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">
                            <BookOpen size={28} strokeWidth={1.5} />
                        </div>
                        <h3>Learn &amp; Grow</h3>
                        <p>Clear instructions and helpful tips help you build confidence and skill.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">
                            <Users size={28} strokeWidth={1.5} />
                        </div>
                        <h3>For Everyone</h3>
                        <p>From beginners to experts, our recipes welcome cooks of all levels.</p>
                    </div>

                </div>
            </section>

            {/* ─── CTA-sektionen ─── */}
            <section className="about-cta-wrapper">
                <div className="about-cta">
                    <h2>Start Your Culinary Journey</h2>
                    <p>
                        Explore our collection of thoughtfully crafted recipes and discover your
                        next signature dish. Every meal is an opportunity to create something special.
                    </p>
                    <Link to="/" className="cta-button">Browse Recipes</Link>
                </div>
            </section>

        </main>
    );
}

export default About;
