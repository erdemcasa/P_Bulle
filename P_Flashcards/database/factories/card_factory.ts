import factory from '@adonisjs/lucid/factories'
import Card from '#models/card'

export const CardFactory = factory
  .define(Card, async ({ faker }) => {
    return {
      question: faker.lorem.sentence() + ' ?',
      answer: faker.lorem.paragraph(),
      deckId: faker.number.int({ min: 1, max: 20 }),
    }
  })
  .build()
