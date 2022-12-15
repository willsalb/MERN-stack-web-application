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