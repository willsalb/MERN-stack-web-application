import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom';
import { createDeck, deleteDeck, getDecks, TDeck } from './api/decks';

function App() {
  const [title, setTitle] = useState('');
  //Store an array of Tdeck types
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    //Don't refresh the page
    e.preventDefault();

    //Re-render a new array and adding the new deck that came from backend
    const deck = await createDeck(title);
    setDecks([...decks, deck]);

    setTitle('');
  }

  useEffect(() => {
    async function fetchDecks() {
      //Get all the array of data is required to need to call response.json
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks(); 
  }, []);

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    //Loop through to the decks and filter the one that matches to the deckId
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="App">
      <ul className='decks'>
        {decks.map((deck) => (
        //Loop over a collection of elements and return new JSX for every entry
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='title'>Title</label>
        <input id='title' type="text" value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create</button>
      </form>
    </div>
  )
}

export default App
