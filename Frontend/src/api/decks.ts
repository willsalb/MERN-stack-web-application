import { API } from "./config";

export async function createDeck(title: string) {
  //persisting data in api
  const response = await fetch(`${API}/decks`, {
  //Making request to the backend and send data
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-type": 'application/json',
    }
  });
  return response.json();
};

export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

export async function getDecks(): Promise<TDeck[]>{
  //Get all the array of data is required to need to call response.json
  const response = await fetch(`${API}/decks`);
  return response.json();
};

export async function deleteDeck(deckId: string) {
  await fetch(`${API}/decks/${deckId}`, {
    method: 'DELETE',
  });
};


export async function createCard(deckId: string, text: string): Promise<TDeck> {
  //persisting data in api 
  const response = await fetch(`${API}/decks/${deckId}/cards`, {
  //Making request to the backend and send data
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-type": 'application/json',
    }
  });
  return response.json();
};


export async function getDeck(deckId: string): Promise<TDeck>{
  //Get all the array of data is required to need to call response.json
  const response = await fetch(`${API}/decks/${deckId}`);
  return response.json();
};

export async function deleteCard(deckId: string, index: number): Promise<TDeck> {
  const response = await fetch(`${API}/decks/${deckId}/cards/${index}`, {
    method: 'DELETE',
  });
  return response.json();
};