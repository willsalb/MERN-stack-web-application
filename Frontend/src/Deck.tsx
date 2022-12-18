import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './Deck.css';
import { Link } from 'react-router-dom';
import {createCard, createDeck, deleteCard, deleteDeck, getDeck, getDecks, TDeck} from './api/decks';



export default function Deck() {
  const [text, setText] = useState('');
  //Store an array of Tdeck types
  const [cards, setCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>();

  const { deckId } = useParams();

  async function handleCreateDeck(e: React.FormEvent) {
    //Don't refresh the page
    e.preventDefault();

    //Re-render a new array and adding the new deck that came from backend
    const { cards: serverCards } = await createCard(deckId!, text);
    //Equal to whatever comes from the server.
    setCards(serverCards);

    setText('');
  }

  useEffect(() => {
    async function fetchDeck() {
      if(!deckId) return;
      //Get all the array of data is required to need to call response.json
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
    //useeffect is going rerun anytime the deckId changes
  }, [deckId]);

   async function handleDeleteCard(index: number) {
    if(!deckId) return;
     const newDeck = await deleteCard(deckId, index);
     setCards(newDeck.cards);
     //Loop through to the decks and filter the one that matches to the deckId
     //setDecks(decks.filter((deck) => deck._id !== deckId));
   }

  return (
    <div className="Deck">
      <ul className='cards'>
        {cards.map((card, index) => (
        //Loop over a collection of elements and return new JSX for every entry
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='text'>Text</label>
        <input id='text' type="text" value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}