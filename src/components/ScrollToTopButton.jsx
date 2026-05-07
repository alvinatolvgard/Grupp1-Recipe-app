import { useEffect, useState, useRef } from "react"
import { ArrowUp } from "lucide-react"
import "./ScrollToTopButton.css"

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Kollar om man scrollat mer än 3000px med scrollY och uppdaterar isVisible
    // Kollar om man scrollar uppåt

    const lastScrollY = useRef(window.scrollY);

    const isScrollingToTop = useRef(false);

    const scrollToTop = () => {
        isScrollingToTop.current = true;
        setIsVisible(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isScrollingToTop.current = false; }, 1000);
    }

    const handleScroll = () => {
        if (isScrollingToTop.current) return;
        const currentScrollY = window.scrollY;

        if (window.scrollY > 3000 && currentScrollY < lastScrollY.current - 10) {
            setIsVisible(true)
        } else if (currentScrollY > lastScrollY.current + 10 || currentScrollY < 1000) {
            setIsVisible(false);
        }

        // Betyder "scrollar uppåt"
        lastScrollY.current = currentScrollY;
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            {isVisible && <button className="scroll-to-top" onClick={scrollToTop}><ArrowUp size={20} />
            </button>}
        </>
    )
}

export default ScrollToTopButton