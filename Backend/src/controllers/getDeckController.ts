import { Request, Response } from 'express';

import Deck from '../models/deck';


export async function getDeck(req:Request, res: Response) {
  //Fetch all the data and send back to the client
  const { deckId } = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
}