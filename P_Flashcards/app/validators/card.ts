import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'minLength': 'Le champ {{ field }} doit faire au moins {{ min }} caractères de long',
  'required': 'Le champ {{ field }} est requis.',
  'unique': 'Cette question existe déjà .',
})

const cardValidator = vine.compile(
  vine.object({
    question: vine
      .string()
      .trim()
      .minLength(1)
      .unique(async (db, value) => {
        const card = await db.from('cards').where('question', value).first()
        return !card
      }),
    answer: vine.string().trim().minLength(1),
  })
)

export { cardValidator }
