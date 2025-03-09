/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  RoleGroupPolicy: () => import('#policies/role_group_policy'),
  RoomPolicy: () => import('#policies/room_policy'),
  BookingPolicy: () => import('#policies/booking_policy'),
  BookingLogPolicy: () => import('#policies/booking_logs_policy'),
}
