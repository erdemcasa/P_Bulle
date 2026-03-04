import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'minLength': 'Le champ {{ field }} doit faire au moins {{ min }} caractères de long',
  'required': 'Le champ {{ field }} est requis.',
  'unique': 'Cette valeur existe déjà.',
})

export const createCardValidator = (cardId?: number) => {
  return vine.compile(
    vine.object({
      question: vine
        .string()
        .trim()
        .minLength(1)
        .unique(async (db, value) => {
          const query = db.from('cards').where('question', value)

          if (cardId) {
            query.whereNot('id', cardId)
          }

          const card = await query.first()
          return !card
        }),
      answer: vine
        .string()
        .trim()
        .minLength(1)
        .unique(async (db, value) => {
          const query = db.from('cards').where('answer', value)

          if (cardId) {
            query.whereNot('id', cardId)
          }

          const card = await query.first()
          return !card
        }),
    })
  )
}
