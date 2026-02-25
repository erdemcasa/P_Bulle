import vine from '@vinejs/vine'

export const registerValidatior = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(50),

    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),

    password: vine.string().minLength(8).maxLength(32),
  })
)

export const loginValidatior = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)
