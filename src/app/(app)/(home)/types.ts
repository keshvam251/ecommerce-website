import { Category } from "@/payload-types";

export type customcategory = Category & {
    subcategories:Category[]

}