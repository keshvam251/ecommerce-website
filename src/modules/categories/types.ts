import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";
import { categories } from "@/collections/Categories";

export type CategoriesGetMAnyOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetMAnyOutputSingle = CategoriesGetMAnyOutput[0];