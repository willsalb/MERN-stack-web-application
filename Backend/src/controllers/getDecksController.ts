import { Request, Response } from 'express';

import Deck from '../models/deck';


export async function getDecks(req:Request, res: Response) {
  //Fetch all the data and send back to the client
  const decks = await Deck.find();
  res.json(decks);
}