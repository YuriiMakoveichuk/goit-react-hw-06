import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { nanoid } from "nanoid";

// import contacts from "./contacts.json";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from "./redux/contactsSlice";
import { setFilterValue } from "./redux/filtersSlice";

function App() {
  // const [userContacts, setUserContacts] = useState(() => {
  //   const memoryContacts = localStorage.getItem("memoryContacts");
  //   if (memoryContacts) {
  //     return JSON.parse(memoryContacts);
  //   }
  //   return contacts;
  // });

  // useEffect(() => {
  //   window.localStorage.setItem("memoryContacts", JSON.stringify(userContacts));
  // }, [userContacts]);

  const userContacts = useSelector((state) => state.contacts.items);
  const searchValue = useSelector((state) => state.filters.name);

  const dispatch = useDispatch();

  // const [searchValue, setSearchValue] = useState("");

  const onAddContact = (newContact) => {
    const finalContact = { ...newContact, id: nanoid(4) };
    // setUserContacts((prev) => {
    //   return [...prev, finalContact];
    // });
    // console.log(finalContact);
    dispatch(addContact(finalContact));
  };

  const onDeleteContact = (deleteId) => {
    // setUserContacts(
    //   userContacts.filter((userContact) => userContact.id !== deleteId)
    // );
    dispatch(deleteContact(deleteId));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const action = setFilterValue(value);
    dispatch(action);
  };

  const filterContact = userContacts.filter((userContact) =>
    userContact.name
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase())
  );

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={onAddContact} />
        <SearchBox searchValue={searchValue} handleSearch={handleSearch} />
        <ContactList
          contacts={filterContact}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </>
  );
}

export default App;
