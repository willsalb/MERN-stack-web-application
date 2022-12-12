require('dotenv').config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import Deck from './models/deck';

const port = 8001

const app = express()

app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  })

  const created = await newDeck.save();
  res.json(created);
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });
})

