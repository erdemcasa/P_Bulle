import LoginController from '#controllers/auth/login_controller'
import LogoutController from '#controllers/auth/logout_controller'
import RegisterController from '#controllers/auth/register_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async (ctx) => {
  await ctx.auth.check()
  return ctx.view.render('pages/home')
}).as('home')

router.get('/deck/add', [DecksController, 'create']).as('decks.create')
router.post('/deck/add', [DecksController, 'store']).as('decks.store')
router.get('/deck/:id', [DecksController, 'show']).as('decks.show')

router.group(() => {
  router.get('/register', [RegisterController, 'show']).as('register.show')
  router.post('/register', [RegisterController, 'store']).as('register.store')

  router.get('/login', [LoginController, 'show']).as('login.show')
  router.post('/login', [LoginController, 'store']).as('login.store')

  router.post('/logout', [LogoutController, 'handle']).as('logout')
}).as('auth')
