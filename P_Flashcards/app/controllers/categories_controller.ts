import Category from "#models/category"
import { categoryValidator } from "#validators/category"
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ view }: HttpContext) {
    const categories = await Category.query().select('*').orderBy('created_at', 'asc')


    return view.render('pages/category/categories', { categories, title: 'Catégories' })
  }

  async create({ view }: HttpContext) {
    const categories = await Category.query().orderBy('name', 'asc')

    return view.render('pages/category/create', { title: "Ajout d'une catégorie", categories })
  }

  async store({ request, session, response }: HttpContext) {
    const { name } = await request.validateUsing(categoryValidator)

    const category = await Category.create({ name })


    session.flash('success', `Catégorie ${category.name} créée avec succès.`)

    return response.redirect().toRoute('categories')

  }

  async show({ params, view }: HttpContext) {

  }

}
