require('dotenv').config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Deck from './models/deck';

const port = 8001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/decks',async (req:Request, res: Response) => {
  //Fetch all the data and send back to the client
  const decks = await Deck.find();
  res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  })

  const created = await newDeck.save();
  res.json(created);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  const deckId = req.params.deckId;

  const deck = await Deck.findByIdAndDelete(deckId);
  
  res.json(deck);
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });
})

