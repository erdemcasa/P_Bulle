import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import CardsController from '#controllers/cards_controller'
import CategoriesController from '#controllers/categories_controller'

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
  router.get('/deck/edit/:id', [DecksController, 'edit']).as('decks.edit')
  router.post('/deck/edit/:id', [DecksController, 'update']).as('decks.update')

  router.get('/deck/play/:id', [DecksController, 'play']).as('decks.play')

  router.get('/categories', [CategoriesController, 'index']).as('categories')
  router.get('/category/add', [CategoriesController, 'create']).as('category.create')
  router.post('/category/add', [CategoriesController, 'store']).as('category.store')
  router.get('/category/:id', [CategoriesController, 'show']).as('category.show')

  router.get('/deck/:deckId/cards/add', [CardsController, 'create']).as('cards.create')
  router.post('/deck/:deckId/cards/add', [CardsController, 'store']).as('cards.store')

  router.delete('/decks/:id', [DecksController, 'destroy']).as('decks.destroy')

  router.delete('/cards/:id', [CardsController, 'destroy']).as('cards.destroy')
  router.get('/cards/edit/:id', [CardsController, 'edit']).as('cards.edit')
  router.post('/cards/edit/:id', [CardsController, 'update']).as('cards.update')


  router.get('/decks/mine', [DecksController, 'showMine']).as('decks.mine')

}).use(middleware.auth())
