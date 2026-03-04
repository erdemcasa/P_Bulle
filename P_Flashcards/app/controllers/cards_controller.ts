import type { HttpContext } from '@adonisjs/core/http'

import Card from "#models/card"
import { createCardValidator } from '#validators/card'
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
    const { question, answer } = await request.validateUsing(createCardValidator())

    const deck = await Deck.findOrFail(params.deckId)
    await deck.related('cards').create({ question, answer })

    session.flash('success', `La carte ${question} a été ajoutée au deck !`)
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  async destroy ({ params, session, response }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId

    await card.delete()

    session.flash('success', 'La carte a été supprimée avec succès !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }

  async edit({ params, view }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck = await Deck.findOrFail(card.deckId)

    return view.render('pages/cards/edit', { title: "Modification d'une carte", card, deck })
  }
  async update({ params, request, session, response, auth }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck = await Deck.findOrFail(card.deckId)

    if (deck.userId !== auth.user!.id) {
      session.flash('error', 'Action non autorisée.')
      return response.redirect().back()
    }

    const payload = await request.validateUsing(
      createCardValidator(card.id)
    )

    card.merge(payload).save()

    session.flash('success', 'La carte a été mise à jour avec succès !')
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

}
