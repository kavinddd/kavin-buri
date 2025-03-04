import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { ModelObject } from '@adonisjs/lucid/types/model'

interface SessionInfo {
  user: User
}
interface SessionResponse {
  user: User
}

@inject()
export default class SessionController {
  constructor(public logger: Logger) {}

  async get({ auth }: HttpContext): Promise<SessionInfo> {
    return { user: auth.getUserOrFail() }
  }

  async store({ request, auth }: HttpContext): Promise<SessionResponse> {
    /**
     * Step 1: Get credentials from the request body
     */
    const { username, password } = request.only(['username', 'password'])

    /**
     * Step 2: Verify credentials
     */

    const user = await User.verifyCredentials(username, password)

    /**
     * Step 3: Login user (use web guard)
     */
    await auth.use('web').login(user)

    this.logger.info(`${user.username} is logged-in successfully`)

    return {
      user,
    }
  }
}
