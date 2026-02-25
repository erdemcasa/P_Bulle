import type { HttpContext } from '@adonisjs/core/http'

import Card from "#models/card"
import { cardValidator } from '#validators/card'
import Deck from '#models/deck'

export default class CardsController {
  /**
   * Display form to create a new record
   */
  async create({ view, params }: HttpContext) {
    const cards = await Card.all()
    const deck = await Deck.findOrFail(params.deckId)

    return view.render('pages/cards/create', { title: "Ajout d'une carte", deck, cards })
  }
  async store({ params, request, session, response }: HttpContext) {
    const { question, answer } = await request.validateUsing(cardValidator)
    
    const deck = await Deck.findOrFail(params.deckId)
    await deck.related('cards').create({ question, answer })

    session.flash('success', `La carte a été ajoutée au deck ${deck.title} !`)
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }
}

