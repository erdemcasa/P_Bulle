import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Card.createMany([
      { id: 1, question: 'capitale de la france', answer: 'panam', deckId: 1 },
      { id: 2, question: 'nom de famille de snehan', answer: 'gnnhannassoryanne', deckId: 2 },
    ])
  }
}
