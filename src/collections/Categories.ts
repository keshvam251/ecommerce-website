import { Description } from '@radix-ui/react-dialog';
import type { CollectionConfig, Config } from 'payload'

export const categories: CollectionConfig ={

    slug:"categories",
    fields: [
        {
        name:"name",
        type:"text",
        required:true,

    },
   
],
};