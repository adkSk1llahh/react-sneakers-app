import { React, useState, useEffect } from "react";
import Drawer from "./components/Drawer.jsx";
import Header from "./components/Header.jsx";
import axios from "axios";
import Home from "./components/Home.jsx";
import Favorites from "./components/Favorites.jsx";
import { Routes, Route } from "react-router-dom";
import AppContext from "./components/Context.jsx";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [onCart, setOnCart] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://61b8321d64e4a10017d18df3.mockapi.io/items"
      );
      const cartResponse = await axios.get(
        "https://61b8321d64e4a10017d18df3.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://61b8321d64e4a10017d18df3.mockapi.io/favorite"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://61b8321d64e4a10017d18df3.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://61b8321d64e4a10017d18df3.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {}
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61b8321d64e4a10017d18df3.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://61b8321d64e4a10017d18df3.mockapi.io/cart/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://61b8321d64e4a10017d18df3.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    onCart === true
      ? (document.body.style.overflowY = "clip")
      : (document.body.style.overflowY = "auto");
  }, [onCart]);

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartItems,
        setOnCart,
      }}
    >
      <div className="wrapper clear">
        {onCart && (
          <Drawer
            items={cartItems}
            onCloseCart={() => setOnCart(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onCLickCart={() => setOnCart(true)} />

        <div className="content p-40">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  items={items}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                  cartItems={cartItems}
                />
              }
              exact
            />

            <Route path="/favorites" element={<Favorites />} exact />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
