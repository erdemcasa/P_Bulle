import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'Le champ {{ field }} est requis.',
})

const deckValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5),
        description: vine.string().trim().minLength(1),
    })
)

export { deckValidator }
