import { useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; //För att sidan inte ska laddas om. Sanel
import useAuthStore from "../../stores/useAuthStore"; // För att hantera logga in och ut. Sanel
import "./Header.css";

/**
 * @author Ivana
 * Huvudkomponenten för webbplatsens navigering.
 *
 * Denna komponent renderar webbplatsens logotyp, en navigeringsmeny
 * (som blir en burgermeny på mobila enheter), en sökikon som öppnar
 * ett sökfält, och kategoriknappar för snabbfilter.
 *
 * @component
 * @returns {JSX.Element} En renderad header-komponent.
 */

export default function Header() {
  // State för att hålla koll på om mobilmenyn (burger) är öppen eller inte
  const [menuOpen, setMenuOpen] = useState(false);
  // State för att hålla koll på om sökfältets dropdown är öppet eller inte
  const [searchOpen, setSearchOpen] = useState(false);

  // State för inloggningsstatus och logout-funktion från store. Sanel
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Skickar användaren till startsiden efter utloggning. Sanel
    setMenuOpen(false); // Stängmobilmenyn om den är öppen. Sanel
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Använde Link istället för <a> för att undvika omladdning. Sanel */}
        <Link className="header__logo" to="/">
          CodeCuisine
        </Link>

        <div className="header__right">
          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>My Recipes</Link>
                <button  onClick={handleLogout} className="header__logout-btn" style={{ background:'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}

            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </nav>

          <button
            className="header__search-icon"
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <Search size={16} />
          </button>
        </div>

        <button
          className="header__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`header__search-dropdown ${searchOpen ? "header__search-dropdown--open" : ""}`}
      >
        <div className="header__search-dropdown-inner">
          <form className="header__search-form">
            <input
              type="text"
              placeholder="Search by recipe name, ingredient, or tag..."
              className="header__search-input"
              autoFocus={searchOpen}
            />
          </form>
          {/* Exempel på kategoriknappar som användaren kan klicka på direkt, här måste vi kanske lägga till vägar senare? */}
          <div className="header__categories">
            <button type="button" className="header__category">
              Dessert
            </button>
            <button type="button" className="header__category">
              Dinner
            </button>
            <button type="button" className="header__category">
              Breakfast
            </button>
            <button type="button" className="header__category">
              Lunch
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="header__overlay" onClick={() => setSearchOpen(false)} />
      )}
    </header>
  );
}
