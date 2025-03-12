import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const idNumberValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const idStringValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string(),
    }),
  })
)
