import React, { useState, useEffect } from 'react';
import './styles.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ItemList from './components/ItemList/ItemList';
import { ItemContext } from './context/ItemContext';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/items', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });
      if (!response.ok) throw new Error('Failed to add item');
      const data = await response.json();
      setItems([...items, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete item');
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  return (
    <ItemContext.Provider value={{ items, addItem, deleteItem, loading, error }}>
      <div className="app-container">
        <h1>Item Manager</h1>
        <AddItemForm />
        <ItemList />
      </div>
    </ItemContext.Provider>
  );
};

export default App;
