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
          // requete qui verifie la valeur entrée dans question de la table cards
          const query = db.from('cards').where('question', value)
          // vérifie si on modifie une carte tout en exluant la carte actuelle, pour eviter les erreurs qui dis que cest unique
          if (cardId) {

            query.whereNot('id', cardId)
          }
          //execution de la requete
          const card = await query.first()
          // retprne true si aucune carte a cette question, sinon false
          return !card
        }),
      answer: vine
      // MEME LOGIQUE QUE EN HAUT
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
