import {React, useState} from 'react'

function Card({onFavor, onPlus, name, imageUrl,price, favorited=false}) {
    const [isAdd, setIsAdd] = useState(false);
    const [isFavor, setIsFavor] = useState(favorited);

    const onClickPlus = () =>{
        setIsAdd(!isAdd)
        onPlus({name, imageUrl,price})
    }

    const onClickFavor = () => {
      setIsFavor(!isFavor)
      onFavor({name, imageUrl, price})
    }


    return (
      <div className="card">
        <div className="favorite"  onClick={onFavor}>
          <img src={isFavor ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked" onClick = {onClickFavor}/>
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers" />
        <h5>{name}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}</b>
          </div>
          <img onClick={onClickPlus} src={isAdd ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
        </div>
      </div>
    );
  }
  
  export default Card;