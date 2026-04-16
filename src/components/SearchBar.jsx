import { useState } from "react"
import useSearchStore from "../stores/useSearchStore"
import { handleSearch } from "../utilities/searchHelpers"
import { useRecipeSearch } from "../api/mealdb"

/**
 * Tar emot användarens sökning och anropar API:et
 * @author Alvina
 * @returns {JSX.Element} - sökfält med sökikon
 */

function SearchBar() {
    const [searchInput, setSearchInput] = useState("")
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm)
    const setSearchResults = useSearchStore((state) => state.setSearchResults)
    const [error, setError] = useState(null)
    const { searchRecipes } = useRecipeSearch();
    
    return (
        <>
            <div className="searchbar">
                {/* Sökikon som triggar sökningen vid klick */}
                <span className="material-symbols-outlined" onClick={() => handleSearch(searchInput, setSearchTerm, setSearchResults, searchRecipes, setError)}>search</span>
                {/* Inputfält som lyssnar på tangenttryck och uppdaterar searchInput */}
                <input type="text" placeholder="Search by recipe name, ingredient, or tag..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(searchInput, setSearchTerm, setSearchResults, searchRecipes, setError)} />
            </div>
            {error && <p>{error}</p>}
        </>
    )
}

export default SearchBar