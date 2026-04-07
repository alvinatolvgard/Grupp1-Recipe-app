// Sanel receptkort
import './RecipeCard.css';

const RecipeCard = () => {
// Detta är fake data till API:et är redo.
    const recipe = {
        title: "Krämig Tryffelpasta",
        description: "En elegant pastarätt med en rik tryffelkräm, perfekt för en lyxig middag hemma.",
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=500",
        time: "30 min",
        difficulty: "Enkel",
        servings: "4 Portioner",
        rating: 4.8,
        category: "Middag"
    };

    const StarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>;
    const ClockIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    const UsersIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>;
    const HeartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>;

    return (
        <article className="recipe-card">
            <div className="card-header">
                <img src={recipe.image} alt={recipe.title} className="card-image" />
                <span className="category-badge">{recipe.category}</span>
                <button className="favorite-circle">{HeartIcon}
                </button>
            </div>

            <div className="card-body">
                <h2>{recipe.title}</h2>
                <p className="recipe-desc">{recipe.description}</p>

                <div className="rating-row">
                    <div className="stars-list">
                        <span className="star-filled">{StarIcon}</span>
                        <span className="star-filled">{StarIcon}</span>
                        <span className="star-filled">{StarIcon}</span>
                        <span className="star-filled">{StarIcon}</span>
                        <span className="star-empty">{StarIcon}</span>
                    </div>
                    <span className="rating-number">{recipe.rating}</span>
                </div>

                <div className="card-footer">
                    <div className="meta-info">
                        <span className="icon-text">{ClockIcon} {recipe.time}</span>
                        <span className="icon-text">{UsersIcon} {recipe.servings}</span>
                    </div>
                    <span className="difficulty-tag">{recipe.difficulty}</span>
                </div>
            </div>
        </article>
    );
};

export default RecipeCard;

// Sanel receptkort