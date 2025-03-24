import vine from '@vinejs/vine'

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

export const dropdownValidator = vine.compile(
  vine.object({
    q: vine.string().optional(),
  })
)
