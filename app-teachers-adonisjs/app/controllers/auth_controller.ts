import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

    /**
     * Controller pour l'authentification
     */
    async login({ request, auth, session, response }: HttpContext) {
        const { username, password } = await request.validateUsing(loginUserValidator)

        const user = await User.verifyCredentials(username, password)

        await auth.use('web').login(user)

        session.flash('success', `L'utilisateur ${user.username} s'est connecté avec succès`)

        return response.redirect().toRoute('home')
    }

    async logout({ auth, session, response }: HttpContext) {
        await auth.use('web').logout()
        
        session.flash('success', "L'utilisateur s'est déconnecté avec succès")
        return response.redirect().toRoute('home')
    }


}