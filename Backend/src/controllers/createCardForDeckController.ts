import { Request, Response } from 'express';

import Deck from '../models/deck';

export async function createCardForDeck(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);

  if(!deck) return res.status(404).send("Deck not exists");

  //The text that's in the body.
  const { text } = req.body;
  //Push the text into the cards array
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}