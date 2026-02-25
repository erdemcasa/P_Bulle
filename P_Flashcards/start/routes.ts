import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import CardsController from '#controllers/cards_controller'

const DecksController = () => import('#controllers/decks_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.group(() => {
  router.get('/login', [LoginController, 'show']).as('login.show')
  router.post('/login', [LoginController, 'store']).as('login.store')

  router.get('/register', [RegisterController, 'show']).as('register.show')
  router.post('/register', [RegisterController, 'store']).as('register.store')
}).as('auth').use(middleware.guest())

router.group(() => {

  router.get('/', [DecksController, 'index']).as('home')

  router.post('/logout', [LogoutController, 'handle']).as('auth.logout')

  router.get('/deck/add', [DecksController, 'create']).as('decks.create')
  router.post('/deck/add', [DecksController, 'store']).as('decks.store')
  router.get('/deck/:id', [DecksController, 'show']).as('decks.show')

  router.get('/deck/:deckId/cards/add', [CardsController, 'create']).as('cards.create')
  router.post('/deck/:deckId/cards/add', [CardsController, 'store']).as('cards.store')

}).use(middleware.auth())
