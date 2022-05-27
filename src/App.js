import './App.css';
import allContacts from './contacts.json';
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 10));

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 1. This is not a proper function
  // 2. It does not filter if the contact already exists
  const addRandomContact = () => {
    const remainingNumber = allContacts.slice(11).length;
    const randomNumber = randomIntFromInterval(0, remainingNumber);
    const randomContact = allContacts.slice(11)[randomNumber];
    const updatedContacts = [...contacts, randomContact];
    // console.log(updatedContacts);

    setContacts(updatedContacts);
  };

  const removeContact = (id) => {
    const remainingContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(remainingContacts);
  };

  // Does not work with contacts array but does work with Allcontacts
  const sortAlphabetically = () => {
    const sortedContacts = contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    setContacts(sortedContacts);
  };

  // const sortPopularity = () => {
  //   const sortedContacts = contacts.sort((a, b) => {
  //     return a - b;
  //   });
  //   setContacts(sortedContacts);
  // };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button
        onClick={() => {
          sortAlphabetically();
        }}
      >
        Sort Alphabetically
      </button>
      {/* <button
        onClick={() => {
          sortPopularity();
        }}
      >
        Sort by Popularity
      </button> */}
      <table>
        <thead>
          <tr>
            <th>picture</th>
            <th>name</th>
            <th>popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    className="contact-picture"
                    src={contact.pictureUrl}
                    alt={contact.name}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar === true ? '🏆' : null}</td>
                <td>{contact.wonEmmy === true ? '🏆' : null}</td>
                <button
                  onClick={() => {
                    removeContact(contact.id);
                  }}
                >
                  Remove Contact
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
