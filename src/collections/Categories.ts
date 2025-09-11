import { Description } from '@radix-ui/react-dialog';
import type { CollectionConfig, Config } from 'payload'

export const categories: CollectionConfig ={

    slug:"categories",
    admin:{
        useAsTitle: "name",
    },

    fields: [
        {
        name:"name",
        type:"text",
        required:true,

    },
    {
        name:"slug",
        type:"text",
        required:true,
        unique:true,
        index:true,
    },
    {
        name:"color",
        type:"text"

    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      required: false,
    },
    {
        name:"subcategories",
        type: "join",
        collection:"categories",
        on:"parent",
        hasMany:true
    }
   
],
};