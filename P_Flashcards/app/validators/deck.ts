import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  minLength: 'Le champ {{ field }} doit faire au moins {{ min }} caractères de long',
  required: 'Le champ {{ field }} est requis.',
})

const deckValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),
    description: vine.string().trim().minLength(10),
    categoryId: vine.number().positive(),
  })
)

export const createDeckValidator = (deckId?: number) => {
  return vine.compile(
    vine.object({
      title: vine
        .string()
        .trim()
        .minLength(2)
        .unique(async (db, value) => {
          // requete qui verifie la valeur entrée dans question de la table decks
          const query = db.from('decks').where('title', value)
          // vérifie si on modifie un deck tout en exluant le deck actuelle, pour eviter les erreurs qui dis que cest unique
          if (deckId) {

            query.whereNot('id', deckId)
          }
          //execution de la requete
          const deck = await query.first()
          // retprne true si aucun deck a ce titre, sinon false
          return !deck
        }),
      description: vine
      // MEME LOGIQUE QUE EN HAUT
        .string()
        .trim()
        .minLength(10)
        .unique(async (db, value) => {
          const query = db.from('decks').where('description', value)

          if (deckId) {
            query.whereNot('id', deckId)
          }

          const deck = await query.first()
          return !deck
        }),
      categoryId: vine
      // MEME LOGIQUE QUE EN HAUT
        .number()
        .positive()
        //.unique(async (db, value) => {
        //  const query = db.from('decks').where('category_id', value)

        //  if (deckId) {
        //    query.whereNot('id', deckId)
        //  }

        //  const deck = await query.first()
        //  return !deck
        //}),
    })
  )
}


export { deckValidator }
