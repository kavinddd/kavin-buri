/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BookingsController = () => import('#controllers/bookings_controller')
import router from '@adonisjs/core/services/router'

// SSR
router.on('/').renderInertia('HomePage')
router.on('/contact').renderInertia('ContactPage')
router.on('/about').renderInertia('AboutPage')
router.on('/booking').renderInertia('BookingPage')
router.on('/rooms').renderInertia('RoomsPage')

// API
router.post('/bookings', [BookingsController, 'store']).as('bookings.store')

// temp
router.get('/bookings', [BookingsController, 'list']).as('bookings.list')
