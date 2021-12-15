import React from 'react';
import Card from './Card.jsx';

const Home = ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) => {
    return (
        <div>
           <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h1>
            <div className="search-block d-flex">
              <img src="/img/search.svg" alt="Search" />
              <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue}/>
              {searchValue && <img className="cu-p" onClick={() => setSearchValue("")} src="/img/btn-remove.svg" alt="Remove" />}
            </div>
          </div>

          <div className="d-flex card__wrapper">
            {
              items
              .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item, index)=>
                <Card 
                key={index}
                name={item.name} 
                price={item.price} 
                imageUrl={item.imageUrl} 
                onFavor={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                />)
            }

          </div>
        </div>
    );
};

export default Home;