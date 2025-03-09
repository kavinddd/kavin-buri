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
        router.post('/login', [SessionController, 'store']).as('sessions.store')
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
            router.get('/', [SessionController, 'get']).as('sessions.get')
          })
          .prefix('/sessions')
          .as('sessions')

        // booking
        router
          .group(() => {
            router.get('/', [BookingsController, 'paginate']).as('paginate')
            router.post('/', [BookingsController, 'create']).as('create')
            router.put('/:id', [BookingsController, 'update']).as('update')
            router.delete('/:id', [BookingsController, 'delete']).as('delete')
          })
          .prefix('/bookings')
          .as('bookings')

        // room
      })
      .use([middleware.auth()])

    router.get('/*', ({ response }) => response.badRequest()).as('badRequest')
  })
  .prefix('/api')
  .as('api')
  .use([middleware.logger()])

router.on('/*').renderInertia('errors/not_found')
