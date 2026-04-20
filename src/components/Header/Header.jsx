import { useState } from "react";
import { Search } from "lucide-react";
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

  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="/">
          CodeCuisine
        </a>

        <div className="header__right">
          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <a href="/recipes">Recipes</a>
            <a href="/favorites">Favorites</a>
            <a href="/about">About</a>
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
              placeholder="Search recipes..."
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
