import { Request, Response } from 'express';

import Deck from '../models/deck';

//Allow a api endpoin to delete the index from the mongo collection
export async function deleteCardOnDeck(req: Request, res: Response) {
    const deckId = req.params.deckId;

    const index = req.params.index;

    const deck = await Deck.findById(deckId);

    if(!deck) return res.status(404).send("Deck not exists");

    //Set the cards array and splice out the card that's equal to the index
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    res.json(deck);
}