import {React, useState, useEffect} from 'react'
import Drawer from './components/Drawer.jsx';
import Header from './components/Header.jsx';
import Card from './components/Card.jsx';
import axios from 'axios';

function App() {
  
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [onCart, setOnCart] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  

  useEffect(() =>{
    axios.get('https://61b8321d64e4a10017d18df3.mockapi.io/items')
    .then(res => {
      setItems(res.data)
    })

    axios.get('https://61b8321d64e4a10017d18df3.mockapi.io/cart')
    .then(res => {
      setCartItems(res.data)
    })

    axios.get('https://61b8321d64e4a10017d18df3.mockapi.io/favorite')
    .then(res => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) =>{
    axios.post('https://61b8321d64e4a10017d18df3.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://61b8321d64e4a10017d18df3.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://61b8321d64e4a10017d18df3.mockapi.io/favorite', obj)
    setFavorites((prev) => [...prev, obj])
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    onCart === true ? document.body.style.overflowY = "clip" : document.body.style.overflowY = "auto";
  } , [onCart])
  


  return (
    <div className="wrapper clear">
      {onCart && <Drawer items={cartItems} onCloseCart = {() => setOnCart(false)} onRemove = {onRemoveItem}/> }
      
      <Header onCLickCart = {() =>setOnCart(true)} />


      <div className="content p-40">
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
    </div>
  );
}

export default App;
