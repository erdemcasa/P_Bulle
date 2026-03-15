import type { HttpContext } from '@adonisjs/core/http'

import Card from '#models/card'
import Deck from '#models/deck'

export default class CategoriesController {

    async create({ view, params }: HttpContext) {
        const cards = await Card.all()
        const deck = await Deck.findOrFail(params.deckId)
        return view.render('pages/cards/create', { title: "Ajout d'une carte", deck, cards })
    }
}