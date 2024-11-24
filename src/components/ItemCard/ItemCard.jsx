import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onDelete }) => {
  return (
    <div className="item-card">
      <div className="item-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <button 
        className="delete-button"
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ItemCard;
