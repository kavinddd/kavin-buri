/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const PricingsController = () => import('#controllers/pricings_controller')
const UsersController = () => import('#controllers/users_controller')
const RoleGroupsController = () => import('#controllers/role_groups_controller')
const RoomsController = () => import('#controllers/rooms_controller')
const GuestsController = () => import('#controllers/guests_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const SessionController = () => import('#controllers/session_controller')
const HealthChecksController = () => import('#controllers/health_checks_controller')

// inertia
router.on('/').renderInertia('HomePage')
router.on('/contact').renderInertia('ContactPage')
router.on('/about').renderInertia('AboutPage')
router.on('/booking').renderInertia('BookingPage')
router.on('/rooms').renderInertia('RoomsPage')

router.post('/bookings', [BookingsController, 'store']).as('bookings.store')
router.get('/bookings', [BookingsController, 'list']).as('bookings.list')

// API

router
  .group(() => {
    // public
    router.get('/testNoAuth', ({ response }) => response.ok('OK')).as('testNoAuth')
    router.get('/health', [HealthChecksController]).as('health')

    router
      .group(() => {
        router.post('/login', [SessionController, 'store']).as('login')
      })
      .prefix('/sessions')
      .as('sessions')

    // auth
    router
      .group(() => {
        router.get('/testAuth', ({ response }) => response.ok('OK')).as('testAuth')

        // sessions
        router
          .group(() => {
            router.get('/', [SessionController, 'get']).as('me')
            router.get('/logout', [SessionController, 'logout']).as('logout')
          })
          .prefix('/sessions')
          .as('sessions')

        // bookings
        router
          .group(() => {
            router.get('/', [BookingsController, 'paginate']).as('paginate')
            router.get('/:id', [BookingsController, 'get']).as('get')
            router.post('/', [BookingsController, 'create']).as('create')
            router.post('/checkIn/:id', [BookingsController, 'checkIn']).as('checkIn')
            router.post('/checkOut/:id', [BookingsController, 'checkOut']).as('checkOut')
            router.patch('/:id', [BookingsController, 'update']).as('update')
            router.delete('/:id', [BookingsController, 'delete']).as('delete')
          })
          .prefix('/bookings')
          .as('bookings')

        // rooms
        router
          .group(() => {
            router.get('/', [RoomsController, 'paginate']).as('paginate')
            router.get('/dropdown', [RoomsController, 'listDropdown']).as('dropdown')
            router.get('/:id', [RoomsController, 'get']).as('get')
            router.post('/', [RoomsController, 'create']).as('create')
            router.patch('/:id', [RoomsController, 'update']).as('update')
            router.delete('/:id', [RoomsController, 'delete']).as('delete')
          })
          .prefix('/rooms')
          .as('rooms')

        // guests
        router
          .group(() => {
            router.get('/', [GuestsController, 'paginate']).as('paginate')
            router.get('/:id', [GuestsController, 'get']).as('get')
            router.post('/', [GuestsController, 'create']).as('create')
            router.patch('/:id', [GuestsController, 'update']).as('update')
            router.delete('/:id', [GuestsController, 'delete']).as('delete')
          })
          .prefix('/guests')
          .as('guests')

        // pricing
        router
          .group(() => {
            router.get('/', [PricingsController, 'get']).as('get')
            router.post('/', [PricingsController, 'create']).as('create')
          })
          .prefix('/pricings')
          .as('pricings')

        // roleGroups
        router
          .group(() => {
            router.get('/', [RoleGroupsController, 'paginate']).as('paginate')
            router.get('/dropdown', [RoleGroupsController, 'listDropdown']).as('dropdown')
            router.get('/:id', [RoleGroupsController, 'get']).as('get')
            router.post('/', [RoleGroupsController, 'create']).as('create')
            router.patch('/:id', [RoleGroupsController, 'update']).as('update')
            router.delete('/:id', [RoleGroupsController, 'delete']).as('delete')
          })
          .prefix('/roleGroups')
          .as('roleGroups')

        // users
        router
          .group(() => {
            router.get('/', [UsersController, 'paginate']).as('paginate')
            router.get('/:id', [UsersController, 'get']).as('get')
            router.post('/', [UsersController, 'create']).as('create')
            router.patch('/:id', [UsersController, 'update']).as('update')
            router.delete('/:id', [UsersController, 'delete']).as('delete')
          })
          .prefix('/users')
          .as('users')
      })
      .use([middleware.auth(), middleware.logger()])

    router.get('/*', ({ response }) => response.badRequest()).as('badRequest')
  })
  .prefix('/api')
  .as('api')

router.on('/*').renderInertia('errors/not_found')
