import React, { useContext, useState } from 'react';
import './AddItemForm.css';
import { ItemContext } from '../../context/ItemContext';

const AddItemForm = () => {
  const { addItem } = useContext(ItemContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
