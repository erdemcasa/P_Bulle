import { CardFactory } from '#database/factories/card_factory'
import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CardFactory.createMany(100000)
  }
}
