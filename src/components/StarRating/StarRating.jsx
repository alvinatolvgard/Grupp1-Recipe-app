import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import {
  generateRating,
  generateRatingCount,
} from "../../utilities/generateRating";
import "./StarRating.css";

/**
 * Återanvändbar komponent för att visa och sätta betyg på recept.
 * Visar automatiskt genererade stjärnor och antal betyg,
 * samt låter inloggade användare sätta ett eget betyg.
 * @author Maryam
 * @param {string} recipeId - receptets unika ID från TheMealDB
 * @param {boolean} isLoggedIn - om användaren är inloggad (kopplas till login senare!!)
 * @param {boolean} interactive - om användaren ska kunna klicka på stjärnorna
 */
const StarRating = ({ recipeId, isLoggedIn = false, interactive = false }) => {
  // Det automatiskt genererade betyget och antalet - som beräknas en gång
  const generatedRating = generateRating(recipeId);
  const ratingCount = generateRatingCount(recipeId);

  // userRating = användarens eget betyg (1-5), null om inget betyg satts
  const [userRating, setUserRating] = useState(null);

  // hoverRating = vilket betyg som "lyser upp" när man hovrar över stjärnorna
  const [hoverRating, setHoverRating] = useState(null);

  // kollar om användaren redan betygsatt det aktuella receptet
  useEffect(() => {
    const saved = localStorage.getItem(`rating_${recipeId}`);
    if (saved) setUserRating(Number(saved));
  }, [recipeId]);

  // sparar användarens betyg i localStorage när man klickar
  const handleRate = (stars) => {
    // TODO: koppla till inloggning när login är klar
    // just nu tillåter vi betygsättning om isLoggedIn är true
    if (!isLoggedIn) return;
    setUserRating(stars);
    localStorage.setItem(`rating_${recipeId}`, stars);
  };

  // betyget som visas
  const displayRating = hoverRating || userRating || generatedRating;

  // räknar ut hur många stjärnor som ska fyllas i (avrundar till närmsta heltal)
  const fullStars = Math.round(displayRating);

  return (
    <div className="star-rating">
      <div className="stars-list">
        {/* Array.from skapar en array med 5 element som vi loopar igenom */}
        {Array.from({ length: 5 }, (_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= fullStars;

          return (
            <span
              key={starNumber}
              className={`star ${isFilled ? "star-filled" : "star-empty"} ${interactive && isLoggedIn ? "star-clickable" : ""}`}
              onClick={() => handleRate(starNumber)}
              onMouseEnter={() =>
                interactive && isLoggedIn && setHoverRating(starNumber)
              }
              onMouseLeave={() =>
                interactive && isLoggedIn && setHoverRating(null)
              }
            >
              <Star
                size={18}
                fill={
                  isFilled ? "var(--color-star)" : "var(--color-star-light)"
                }
                stroke="var(--color-star)"
                strokeWidth={1.5}
              />
            </span>
          );
        })}
      </div>

      {/* visar numeriskt betyg och antal ex: 4.2 (24) */}
      <span className="rating-number">
        {userRating ? userRating.toFixed(1) : generatedRating} ({ratingCount})
      </span>
    </div>
  );
};

export default StarRating;
