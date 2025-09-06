import { createTRPCRouter } from "../init";
import { authRouter } from "./authRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // add more routers here (e.g., categories, products…)
});

export type AppRouter = typeof appRouter;
