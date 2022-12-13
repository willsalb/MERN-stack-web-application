import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


type TDeck = {
  title: string,
  _id: string
}

function App() {
  const [title, setTitle] = useState('');
  //Store an array of Tdeck types
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    //Don't refresh the page
    e.preventDefault();

    //persisting data in api
    await fetch('http://localhost:8001/decks', {
      //Making request to the backend and send data
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": 'application/json',
      }
    });

    setTitle('');
  }

  useEffect(() => {
    async function fetchDecks() {
      //Get all the array of data is required to need to call response.json
      const response = await fetch('http://localhost:8001/decks');
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks(); 
  }, []);

  return (
    <div className="App">
      <ul className='decks'>
        {decks.map((deck) => (
        //Loop over a collection of elements and return new JSX for every entry
          <li key={deck._id}>{deck.title}</li>
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
