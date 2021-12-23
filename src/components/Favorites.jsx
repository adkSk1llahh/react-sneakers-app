import { React, useContext } from "react";
import AppContext from "./Context.jsx";
import Card from "./Card.jsx";

function Favorites() {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div>
      <div className="d-flex card__wrapper">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavor={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
