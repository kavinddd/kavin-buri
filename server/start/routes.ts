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

// API
router.post('/bookings', [BookingsController, 'store']).as('bookings.store')
