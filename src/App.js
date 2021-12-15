import {React, useState, useEffect} from 'react'
import Drawer from './components/Drawer.jsx';
import Header from './components/Header.jsx';
import axios from 'axios';
import Home from './components/Home.jsx';
import Favorites from './components/Favorites.jsx';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

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
        <Routes>
          <Route path="/" element={
            <Home 
            items={items} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            />
            } exact/>

          <Route path="/favorites" element={
          <Favorites 
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />}/>
        </Routes>
    
      </div>
    </div>
  );
}

export default App;
