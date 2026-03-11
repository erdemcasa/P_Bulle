import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  minLength: 'Le champ {{ field }} doit faire au moins {{ min }} caractères de long',
  required: 'Le champ {{ field }} est obligatoire.',
})

const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3)
  })
)

export { categoryValidator }
