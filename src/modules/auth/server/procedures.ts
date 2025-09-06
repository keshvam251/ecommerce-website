import { headers as getHeaders, cookies as getCookies } from 'next/headers'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { AUTH_COKKIE } from '../constants'
import { loginschema, registerSchema } from '../schema'

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    console.log('NÅ ER JEG HER...')
    console.log('DET ER HER DET FEILER...')

    const headers = await getHeaders()
    // console.log('HEADERS:', { headers })

    const session = await ctx.db.auth({ headers })
    // console.log('SESSIOP:', { session })

    return session
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies()
    cookies.delete(AUTH_COKKIE)
  }),

  register: baseProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const existingData = await ctx.db.find({
      collection: 'users',
      limit: 1,
      where: {
        username: {
          equals: input.username,
        },
      },
    })

    const existingUser = existingData.docs[0]

    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Brukernavnet er opptatt...',
      })
    }

    await ctx.db.create({
      collection: 'users',
      data: {
        email: input.email,
        username: input.username,
        password: input.password, //dette blir hashet av payload
      },
    })
    const data = await ctx.db.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })
    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Feilet innlogging',
      })
    }

    const cookies = await getCookies()
    cookies.set({
      name: AUTH_COKKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: ""
    })
  }),

login: baseProcedure
  .input(loginschema)
  .mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    })
    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Feilet innlogging',
      })
    }

    const cookies = await getCookies()
    cookies.set({
      name: AUTH_COKKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: ""
    })
    console.log('I PROCEDURES: ', JSON.stringify(data, null, 2))

    return data
  }),
})
