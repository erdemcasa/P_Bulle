import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Card from './card.js'
import type { BelongsTo, HasMany, HasOne  } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Category from './category.js'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  @column()
  declare userId: Number


  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
  @column()
  declare categoryId: Number



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relation qui est liée au controller avec le withCont('cards')
  @hasMany(() => Card)
  declare cards: HasMany<typeof Card>


  // declaration de cards_count en tant que number pour le nombre de cartes
  declare $extras: {
    cards_count: number,
    category_name: string
  }

  // un get qui permet d'acceder au nombre de cartes grace a nbCards, un return qui affiche le nombre de cartes ou 0.
  get nbCards() {
    return this.$extras.cards_count || 0
  }

  get catName() {
    return this.$extras.category_name || 'erreur'
  }
}
