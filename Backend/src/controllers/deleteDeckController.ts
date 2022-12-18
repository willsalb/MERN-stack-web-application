import { Request, Response } from 'express';

import Deck from '../models/deck';

export async function deleteDeck (req: Request, res: Response) {
  const deckId = req.params.deckId;

  const deck = await Deck.findByIdAndDelete(deckId);
  
  res.json(deck);
}