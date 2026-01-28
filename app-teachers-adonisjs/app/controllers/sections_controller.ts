import Section from '#models/section';
import { sectionValidator } from '#validators/section';
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper';

export default class SectionsController {
    /**
     * Display a list of resource
     */
    async index({ view }: HttpContext) {

        const sections = await Section.query().orderBy('name', 'asc');
        //dd(section)

        // Appel de la vue
        return view.render('pages/sections/show.edge', { title: 'Liste des section', sections })
    }

    /**
     * Delete record
     */
    async destroy({ params, session, response }: HttpContext) {
        const section = await Section.findOrFail(params.id);

        await section.delete();

        session.flash('success', `La section ${section.name} a été supprimé avec succès !`);

        return response.redirect().toRoute('home');

    }
      /**
       * Display form to create a new record
       */
      async create({ view }: HttpContext) {
    
        return view.render('pages/sections/create', {
          title: "Ajout d'une section",
        })
    
    
      }

    /**
     * Handle form submission for the create action
     */
    async store({ request, session, response }: HttpContext) {

        await request.validateUsing(sectionValidator)
        const { name } = await request.validateUsing(sectionValidator)

        const section = await Section.create({ name })

        // Afficher un message à l'utilisateur
        session.flash('success', `la nouvelle section ${section.name} a été ajouté avec succès !`)

        // Rediriger vers la homepage
        return response.redirect().toRoute('section.show')
    }

}