import Card from '#models/card'
import Category from '#models/category'
import Deck from '#models/deck'
import User from '#models/user'
import { createDeckValidator, deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
import Refresh from '@adonisjs/lucid/commands/migration/fresh'
import db from '@adonisjs/lucid/services/db'

export default class DecksController {
  /**
   * Display a list of resource aaa
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().preload('category').select('*').orderBy('created_at', 'desc').withCount('cards')

    return view.render('pages/home', { decks })
  }


  /**
   * Afifchage de la liste des decjs de l'user connectée
   */
  async showMine({ auth, view }: HttpContext) {
    const decks = await Deck.query()
        .preload('category')
        .where('userId', auth.user!.id)
        .withCount('cards')
        .orderBy('createdAt', 'desc')



    return view.render('pages/home', { decks })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const decks = await Deck.query().orderBy('title', 'asc')
    const categories = await Category.query().orderBy('id', 'asc')

    return view.render('pages/decks/create', { title: "Ajout d'un deck", decks, categories })
  }

  async store({ request, session, response, auth }: HttpContext) {
    const { title, description, categoryId } = await request.validateUsing(deckValidator)

    const deck = await Deck.create({ title, description, categoryId, userId: auth.user!.id })

    session.flash('success', `Le deck ${deck.title} a été ajouté avec succès !`)

    return response.redirect().toRoute('home')
  }

  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().preload('user').preload('category').where('id', params.id).firstOrFail()

    const cards = await Card.query().where('deck_id', deck.id)

    return view.render('pages/decks/show', { deck, user: deck.user, cards})
  }




  async destroy({ params, session, response, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    if (deck.userId !== auth.user!.id) {
      session.flash('error', 'Action non autorisé')
      return response.redirect().back()
    }

    await Card.query().where('deck_id', deck.id).delete()

    await deck.delete()

    session.flash('success', `Le deck "${deck.title}" et toutes ses cartes ont ete supprimeé `)
    return response.redirect().toRoute('home')
  }

  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    const categories = await Category.query()

    const category = await Category.query().where('id', deck.categoryId.toString()).firstOrFail()

    //dd(category.name)

    //dd(categories[params.id].name)

    return view.render('pages/decks/edit', { title: "Modification d'un deck", deck, categories, category })
  }

  async update({ view, params, request, session, response, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    if (deck.userId !== auth.user!.id) {
      session.flash('error', 'Action non autorisée.')
      return response.redirect().back()
    }

    const payload = await request.validateUsing(
      createDeckValidator(deck.id)
    )

    deck.merge(payload).save()

    session.flash('success', 'Le deck a été mis à jour avec succès !')

    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

async play({ params, request, view }: HttpContext) {
  const deck = await Deck.query()
    .where('id', params.id)
    .preload('cards')
    .firstOrFail()

  const cards = deck.cards

  const page = request.input('page', 0)
  const step = request.input('step', 'question')
  const score = request.input('score', 0)

  if (page >= cards.length) {
    return view.render('pages/decks/finish', {
      deck,
      score,
      total: cards.length
    })
  }

  const currentCard = cards[page]
  if (!currentCard) {
    return view.render('pages/decks/finish', { deck, score, total: cards.length })
  }

  return view.render('pages/decks/play', {
    deck,
    card: currentCard,
    page,
    step,
    score,
    total: cards.length
  })
}

}
