import React, { useContext } from 'react';
import './ItemList.css';
import ItemCard from '../ItemCard/ItemCard';
import { ItemContext } from '../../context/ItemContext';

const ItemList = () => {
  const { items, deleteItem, loading, error } = useContext(ItemContext);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard key={item.id} item={item} onDelete={deleteItem} />
      ))}
    </div>
  );
};

export default ItemList;
