import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  minLength: 'Le champ {{ field }} doit faire au moins {{ min }} caractères de long',
  required: 'Le champ {{ field }} est requis.',
})

const deckValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),
    description: vine.string().trim().minLength(10),
  })
)

export { deckValidator }
