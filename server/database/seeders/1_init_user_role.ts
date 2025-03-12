import Role from '#models/role'
import RoleGroup from '#models/role_group'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()

    try {
      const roles = await Role.createMany(
        [
          {
            name: 'ADMIN',
            description: 'Able to access all resources',
          },
          {
            name: 'READ_BOOKING',
            description: 'Able to read bookings',
          },
          {
            name: 'EDIT_BOOKING',
            description: 'Able to create/edit bookings',
          },
          {
            name: 'READ_ROOM',
            description: 'Able to read rooms',
          },
          {
            name: 'EDIT_ROOM',
            description: 'Able to create/edit rooms',
          },
          {
            name: 'READ_ROLE_GROUP',
            description: 'Able to read role groups',
          },
          {
            name: 'EDIT_ROLE_GROUP',
            description: 'Able to create/edit role groups',
          },
          {
            name: 'READ_GUEST',
            description: 'Able to read guests',
          },
          {
            name: 'EDIT_GUEST',
            description: 'Able to create/edit guests',
          },
        ],
        { client: trx }
      )

      const roleGroups = await RoleGroup.createMany(
        [
          {
            name: 'Admin',
          },
          {
            name: 'Front Office',
          },
        ],
        { client: trx }
      )
      const adminRoleIds = roles.filter((role) => role.name === 'ADMIN').map((role) => role.id)
      const adminRoleGroup = roleGroups[0]
      await adminRoleGroup.related('roles').attach(adminRoleIds, trx)

      const frontOfficeRoleIds = roles
        .filter((role) =>
          ['READ_BOOKING', 'EDIT_BOOKING', 'READ_ROOM', 'EDIT_ROOM'].includes(role.name)
        )
        .map((role) => role.id)
      const frontOfficeRoleGroup = roleGroups[1]
      frontOfficeRoleGroup.related('roles').attach(frontOfficeRoleIds, trx)

      //region users

      const adminUser = await User.create(
        {
          fullName: 'admin',
          username: 'admin',
          password: 'admin',
        },
        { client: trx }
      )

      const frontOfficeUser = await User.create(
        {
          fullName: 'frontOffice',
          username: 'frontOffice',
          password: 'frontOffice',
        },
        { client: trx }
      )

      await adminUser.related('roleGroups').attach([adminRoleGroup.id], trx)
      await frontOfficeUser.related('roleGroups').attach([frontOfficeRoleGroup.id], trx)

      await trx.commit()

      //endregion
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
