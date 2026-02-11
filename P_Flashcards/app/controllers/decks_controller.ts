import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DecksController {
  /**
   * Display a list of resource aaa
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query()
      .select('*')
      .select(db.from('cards').count('*').whereRaw('cards.deck_id = decks.id').as('cards_count'))
      .orderBy('title', 'asc')

    return view.render('pages/home', { decks })
  }
  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const decks = await Deck.query().orderBy('title', 'asc')

    return view.render('pages/decks/create', { title: "Ajout d'un deck", decks })
  }

  async store({ request, session, response }: HttpContext) {
    const { title, description } = await request.validateUsing(deckValidator)

    const deck = await Deck.create({ title, description })

    session.flash('success', `Le deck ${deck.title} a été ajouté avec succès !`)

    return response.redirect().toRoute('home')
  }
}
