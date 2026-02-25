import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Card from './card.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relation qui est liée au controller avec le withCont('cards')
  @hasMany(() => Card)
  declare cards: HasMany<typeof Card>

  // declaration de cards_count en tant que number pour le nombre de cartes
  declare $extras: {
    cards_count: number
  }

  // un get qui permet d'acceder au nombre de cartes grace a nbCards, un return qui affiche le nombre de cartes ou 0.
  get nbCards() {
    return this.$extras.cards_count || 0
  }
}
