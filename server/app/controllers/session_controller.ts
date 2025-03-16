import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { ModelObject } from '@adonisjs/lucid/types/model'
import Role from '#models/role'

interface SessionInfo {
  user: User
  roles: Role[]
}

@inject()
export default class SessionController {
  constructor(public logger: Logger) {}

  async get({ auth }: HttpContext): Promise<SessionInfo> {
    const user = auth.getUserOrFail()
    await user.loadOnce('roleGroups')
    await Promise.all(user.roleGroups.map(async (roleGroup) => await roleGroup.loadOnce('roles')))
    const roles = user.roleGroups.flatMap((rg) => rg.roles)

    return { user: user, roles: roles }
  }

  async store({ request, auth }: HttpContext): Promise<SessionInfo> {
    /**
     * Step 1: Get credentials from the request body
     */
    const { username, password } = request.only(['username', 'password'])

    /**
     * Step 2: Verify credentials
     */

    const user = await User.verifyCredentials(username, password)

    await user.loadOnce('roleGroups')
    const roleGroupIds = user.roleGroups.map((it) => it.id)
    const roles = await Role.findMany(roleGroupIds)

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
