import factory from '@adonisjs/lucid/factories'
import Deck from '#models/deck'

export const DeckFactory = factory
  .define(Deck, async ({ faker }) => {
    return {
      title: faker.book.title(),
      description: faker.lorem.paragraph(1),
      userId: faker.number.int({ min: 1, max: 10 })
    }
  })
  .build()
