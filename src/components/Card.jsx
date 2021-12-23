import { React, useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "./Context.jsx";

function Card({
  id,
  onFavor,
  onPlus,
  name,
  imageUrl,
  price,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavor, setIsFavor] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, name, imageUrl, price });
  };

  const onClickFavor = () => {
    onFavor({ id, name, imageUrl, price });
    setIsFavor(!isFavor);
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite" onClick={onFavor}>
            <img
              src={isFavor ? "/img/liked.svg" : "/img/unliked.svg"}
              alt="Unliked"
              onClick={onClickFavor}
            />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            <img
              onClick={onClickPlus}
              src={
                isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
