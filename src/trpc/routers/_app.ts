import {  createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { authRouter } from '@/modules/auth/server/procedures';
export const appRouter = createTRPCRouter({
    categories:categoriesRouter,
    auth: authRouter
});
export type AppRouter = typeof appRouter;