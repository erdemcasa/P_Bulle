import { DeckFactory } from '#database/factories/deck_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await DeckFactory.createMany(100)
  }
}
