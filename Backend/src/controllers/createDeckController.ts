import { Request, Response } from 'express';

import Deck from '../models/deck';

export async function createDeck (req: Request, res: Response) {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const created = await newDeck.save();
  res.json(created);
}