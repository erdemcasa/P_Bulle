/* eslint-disable prettier/prettier */
import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
      await Deck.createMany([

        { id: 1,
          title: 'Capitales',
          description: 'trouver les capitales des pays'
        },
        {
          id: 2,
          title: 'dictateurs',
          description: 'trouver les noms de familles des dictateurs'
        },
      ])
  }
}
