import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from "@/trpc/init";


export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: 'categories',
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    })

   const formatedData= data.docs.map((doc: any) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc: Category) => {
      return ({
        ...(doc as Category),
      })
    }),
  }))
return formatedData; 
    }),

});