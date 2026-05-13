import { useEffect, useState } from "react"
import useSearchStore from "../stores/useSearchStore"
import { handleSearch } from "../utilities/searchHelpers"
import { useRecipeSearch } from "../api/mealdb"
import { Search } from "lucide-react";

/**
 * Tar emot användarens sökning och anropar API:et
 * @author Alvina
 * @returns {JSX.Element} - sökfält med sökikon
 */

function SearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const [error, setError] = useState(null)
    const { searchRecipes } = useRecipeSearch()
    const hasSearched = useSearchStore((state) => state.hasSearched)

    useEffect(() => {
        if (!hasSearched) setSearchInput('')
    }, [hasSearched])
    
    return (
        <>
            <div className="searchbar">
                {/* Sökikon som triggar sökningen vid klick */}
                <span className="search-icon" onClick={() => handleSearch(searchInput, searchRecipes, setError)}><Search size={18} /></span>
                {/* Inputfält som lyssnar på tangenttryck och uppdaterar searchInput */}
                <input type="text" placeholder="Search by recipe name, ingredient, or tag..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(searchInput, searchRecipes, setError)} />
            </div>
            {error && <p>{error}</p>}
        </>
    )
}

export default SearchBar