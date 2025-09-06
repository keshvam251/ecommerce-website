import z from 'zod'
import { headers as getHeader, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from '@trpc/server';
import { AUTH_COKKIE } from '@/modules/auth/constants';
import { registerSchema } from '@/modules/auth/schema'; 

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeader();
    const session = await ctx.db.auth({ headers });
    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      
      const user = await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });

      // 2. Auto-login after register
      const loginResult = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!loginResult.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login after register",
        });
      }

      // 3. Save cookie
      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COKKIE,
        value: loginResult.token,
        httpOnly: true,
        path: "/",
        sameSite: "lax", // change to 'none' if cross-domain
      });

      // 4. Return something so frontend onSuccess gets data
      return { user, token: loginResult.token };
    }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COKKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      });

      return data;
    }),
});
