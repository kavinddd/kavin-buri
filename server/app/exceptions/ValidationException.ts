import { Exception } from '@adonisjs/core/exceptions'

export class ValidationException extends Exception {
  constructor(message: string) {
    super(message, {
      code: 'E_VALIDATE',
      status: 400,
    })
  }
}
