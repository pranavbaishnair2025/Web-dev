import React from 'react';
import './card.css'
function Card(){

  return(
    <div className="menu">
      <div className="product">
        <img src="https://images.pexels.com/photos/6068717/pexels-photo-6068717.jpeg" alt="Pizza" height="200" width="200"></img>
        <h2>Pizza</h2>
        <p>Rs. 500</p>
        <button>Buy Now</button>
      </div>
    </div>
  )
}
export default Card;