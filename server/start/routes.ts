/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BookingsController = () => import('#controllers/bookings_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { HealthChecks } from '@adonisjs/core/health'
import HealthChecksController from '#controllers/health_checks_controller'

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
    router.post('/sessions/login', [SessionController, 'store']).as('sessions.store')
    // router.get('/sessions/test', [SessionController, 'test']).as('sessions.test')
    router.get('/health', [HealthChecksController]).as('health')

    router
      .group(() => {
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
        router
      })
      .use(middleware.auth())
    router.get('/*', ({ response }) => response.badRequest()).as('badRequest')
  })
  .prefix('/api')
  .as('api')

router.on('/*').renderInertia('errors/not_found')
