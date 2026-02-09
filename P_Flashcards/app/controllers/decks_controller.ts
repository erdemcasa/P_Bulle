import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().orderBy('title', 'asc')

    return view.render('pages/home', { decks })
  }
  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('deck').firstOrFail()

    return view.render('pages/teachers/show.edge', { title: "Détail d'unenseignant", teacher })
  }
}
