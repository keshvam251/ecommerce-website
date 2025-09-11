import { createTRPCRouter } from '../init'

import { categoriesRouter } from '@/modules/categories/server/procedure'
import { authRouter } from '@/modules/auth/server/procedures'
import { productsRouter } from '@/modules/productss/server/procedure'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,   // 👈 lowercase
  categories: categoriesRouter,
})

export type AppRouter = typeof appRouter
