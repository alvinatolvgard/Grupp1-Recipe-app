import { useState } from "react"
import useSearchStore from "../stores/useSearchStore"

function SearchBar() {
    const [searchInput, setSearchInput] = useState("")
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm)
    const setSearchResults = useSearchStore((state) => state.setSearchResults)

    handleSearch(searchInput, setSearchTerm, setSearchResults);
    
    return (
        <div>
            <div className="searchbar">
                <span className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <input type="text" placeholder="Search by recipe name, ingredient, or tag..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()} />

            </div>
        </div>
    )
}

export default SearchBar