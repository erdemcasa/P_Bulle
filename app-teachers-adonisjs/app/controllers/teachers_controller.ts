import Section from '#models/section'
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nomet le prénom
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')
    //dd(teachers)
    // Appel de la vue
    return view.render('pages/home', { teachers })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc');

    return view.render('pages/teachers/create', {
      title: "Ajout d'un enseignant",
      sections
    })


  }
  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {

    await request.validateUsing(teacherValidator)
    // Création du nouvel enseignant
    const { gender, firstname, lastname, nickname, origine, sectionId } = await request.validateUsing(teacherValidator)

    // Création du nouvel enseignant
    const teacher = await Teacher.create({ gender, firstname, lastname, nickname, origine, sectionId })

    // Afficher un message à l'utilisateur
    session.flash('success', `Le nouvel enseignant ${teacher.lastname} ${teacher.firstname} a été ajouté avec succès !`)

    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }
  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut afficher les détails
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail();
    // Afficher la vue
    return view.render('pages/teachers/show.edge', { title: "Détail d'unenseignant", teacher });
  }
  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    const sections = await Section.query().orderBy('name', 'asc');

    return view.render('pages/teachers/edit.edge', {
      title: 'Modifier un enseignant',
      teacher,
      sections,
    });
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const { gender, firstname, lastname, nickname, origine, sectionId } =
    await request.validateUsing(teacherValidator)

    const teacher = await Teacher.findOrFail(params.id)

    teacher.merge({
      gender,
      firstname,
      lastname,
      nickname,
      origine,
      sectionId,
    })
    const teacherUpdated = await teacher.save()

    session.flash(
      'success',
      `L'enseignant ${teacherUpdated.lastname} ${teacherUpdated.firstname} a été mis à jour avec succès !`
    )

    return response.redirect().toRoute('home')
  }
  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id);

    await teacher.delete();

    session.flash('success', `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès !`);

    return response.redirect().toRoute('home');

  }
}
