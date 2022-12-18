require('dotenv').config();

// @ts-ignore
import express, { Request, Response } from 'express';
// @ts-ignore
import cors from 'cors';
import mongoose from 'mongoose';

import Deck from './models/deck';
import { getDecks } from './controllers/getDecksController';
import { createDeck } from './controllers/createDeckController';
import { deleteDeck } from './controllers/deleteDeckController';
import { createCardForDeck } from './controllers/createCardForDeckController';
import { getDeck } from './controllers/getDeckController';
import { deleteCardOnDeck } from './controllers/deleteCardOnDeckController';

const port = 8001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/decks', getDecks);
app.post('/decks', createDeck);
app.delete('/decks/:deckId', deleteDeck);
app.get('/decks/:deckId', getDeck);
app.post('/decks/:deckId/cards', createCardForDeck);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeck);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });
})

