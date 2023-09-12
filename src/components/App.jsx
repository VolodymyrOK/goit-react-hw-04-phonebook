import { GlobalStyle } from 'styles/GlobalStyles';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import data from '../data/data.json';
import { Layout } from 'styles/Layout';
import { ContactsEntry } from './ContactsEntry/ContactsEntry';
import { ContactsList } from './ContactsList/ContactsList';

const STORAGE_KEY = 'storage-contacts';

const getListContacts = () => {
  const storageContacts = localStorage.getItem(STORAGE_KEY);
  return storageContacts !== null && storageContacts.length > 2
    ? JSON.parse(storageContacts)
    : data;
};

export const App = () => {
  const [contacts, setContacts] = useState(getListContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = newContacts => {
    const isDuplicated = contacts.find(
      item => item.name.toLowerCase() === newContacts.name.toLowerCase()
    );
    if (isDuplicated)
      return alert(newContacts.name + ' is already in contacts');

    setContacts(prevState => [...prevState, { id: nanoid(4), ...newContacts }]);
  };

  const delContact = idContact => {
    if (window.confirm('Are you sure?'))
      // setContacts(contacts.filter(item => item.id !== idContact));
      setContacts(prev => prev.filter(item => item.id !== idContact));
  };

  const onFilterElement = newFilter => {
    setFilter(newFilter);
  };

  return (
    <Layout>
      <ContactsEntry onAdd={addContact} />

      <ContactsList
        onFilterElement={onFilterElement}
        filter={filter}
        contacts={visibleContacts}
        onDelContact={delContact}
      />
      <GlobalStyle />
    </Layout>
  );
};
