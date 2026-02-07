import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {

    const decks = await Deck.query().orderBy('title', 'asc')

    return view.render('pages/home', { decks })
    
  }}
