import React from 'react';
import Card from './Card.jsx';
const Favorites = ({items, onAddToFavorite}) => {
    return (
        <div>
          <div className="d-flex card__wrapper">
            {
              items
              .map((item, index)=>
                <Card 
                key={index}
                name={item.name} 
                price={item.price} 
                imageUrl={item.imageUrl} 
                favorited={true}
                onFavor={onAddToFavorite}
                />)
            }

          </div>
        </div>
    );
};

export default Favorites;