import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, updateContact, removeContact } from './contactsSlice';


function App() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateContact = () => {
    if (editingId) {
      dispatch(updateContact({ id: editingId, name, phone }));
      setEditingId(null);
    } else {
      dispatch(addContact({ id: Date.now(), name, phone }));
    }
    setName('');
    setPhone('');
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setName(contact.name);
    setPhone(contact.phone);
  };

  return (
    <div className="App">
   
      <div className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ИМЯ"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="ТЕЛЕФОН"
        />
        <button onClick={handleAddOrUpdateContact}>
          {editingId ? 'ИЗМЕНИТЬ КОНТАКТ' : 'ДОБАВИТЬ'}
        </button>
      </div>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>{contact.name} - {contact.phone}</span>
            <button onClick={() => handleEdit(contact)}>ИЗМЕНИТЬ</button>
            <button onClick={() => dispatch(removeContact(contact.id))}>УДАЛИТЬ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
