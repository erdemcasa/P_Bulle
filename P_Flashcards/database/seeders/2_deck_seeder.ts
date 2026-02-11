import { DeckFactory } from '#database/factories/deck_factory'
import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await DeckFactory.createMany(50)
  }
}
