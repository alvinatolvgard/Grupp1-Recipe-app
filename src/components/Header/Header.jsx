import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import useFavoritesStore from "../../stores/useFavoritesStore";
import useSearchStore from "../../stores/useSearchStore";
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
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const setActiveFilter = useSearchStore((state) => state.setActiveFilter);
  const navigate = useNavigate();

  const headerCategories = ["Breakfast", "Dessert", "Vegetarian", "Vegan"];

  const handleHeaderCategoryClick = (category) => {
    setActiveFilter(category);
    navigate("/");
    setSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          CodeCuisine
        </Link>

        <div className="header__right">
          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <Link to="/">Recipes</Link>
            <Link to="/favourites" className="header__favorites-link">
              Favourites
              {favoritesCount > 0 && (
                <span className="header__favorites-badge">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/about">About</Link>
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
            {headerCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="header__category"
                onClick={() => handleHeaderCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="header__overlay" onClick={() => setSearchOpen(false)} />
      )}
    </header>
  );
}
