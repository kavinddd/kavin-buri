import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import Role from '#models/role'
import RoleGroupRole from '#models/role_group_role'

interface SessionInfo {
  user: User
  roles: Role[]
}

@inject()
export default class SessionController {
  constructor(public logger: Logger) {}

  async get({ auth }: HttpContext): Promise<SessionInfo> {
    const user = auth.getUserOrFail()
    const roleGroupIds = user.roleGroups.map((it) => it.id)

    const roleGroupRoles = await RoleGroupRole.query().whereIn('roleGroupId', roleGroupIds)
    const roleIds = roleGroupRoles.map((it) => it.roleId)
    const roles = await Role.findMany(roleIds)

    await user.load('roleGroups')

    return { user: user, roles: roles }
  }

  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { username, password } = request.only(['username', 'password'])

    /**
     * Step 2: Verify credentials
     */

    const user = await User.verifyCredentials(username, password)

    if (!user.isActive) {
      return response.unauthorized({ errors: [{ message: 'User is not active.' }] })
    }

    await user.load('roleGroups')
    const roleGroupIds = user.roleGroups.map((it) => it.id)

    const roleGroupRoles = await RoleGroupRole.query().whereIn('roleGroupId', roleGroupIds)
    const roleIds = roleGroupRoles.map((it) => it.roleId)
    const roles = await Role.findMany(roleIds)

    /**
     * Step 3: Login user (use web guard)
     */
    await auth.use('web').login(user)

    this.logger.info(`${user.username} is logged-in successfully`)

    return {
      user: user,
      roles: roles,
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    auth.use('web').logout()

    this.logger.info(`${user.username} is logged-out successfully`)
  }
}
