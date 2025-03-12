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
import RoleGroupsController from '#controllers/role_groups_controller'

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
          })
          .prefix('/sessions')
          .as('sessions')

        // roleGroups
        router
          .group(() => {
            router.get('/', [RoleGroupsController, 'paginate']).as('paginate')
            router.get('/:id', [RoleGroupsController, 'get']).as('get')
            router.post('/', [RoleGroupsController, 'create']).as('create')
            router.patch('/:id', [RoleGroupsController, 'update']).as('update')
            router.delete('/:id', [RoleGroupsController, 'delete']).as('delete')
          })
          .prefix('/roleGroups')
          .as('roleGroups')

        // bookings
        router
          .group(() => {
            router.get('/', [BookingsController, 'paginate']).as('paginate')
            router.get('/:id', [BookingsController, 'get']).as('get')
            router.post('/', [BookingsController, 'create']).as('create')
            router.patch('/:id', [BookingsController, 'update']).as('update')
            router.delete('/:id', [BookingsController, 'delete']).as('delete')
          })
          .prefix('/bookings')
          .as('bookings')

        // rooms
      })
      .use([middleware.auth(), middleware.logger()])

    router.get('/*', ({ response }) => response.badRequest()).as('badRequest')
  })
  .prefix('/api')
  .as('api')

router.on('/*').renderInertia('errors/not_found')
