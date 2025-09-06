import z from "zod";

export const loginschema = z.object({
 email: z.string().pipe(z.email()),
  password: z.string().min(6),
});

export const registerSchema = z.object({
   email: z.string().pipe(z.email()),
  password: z.string(),
  username: z
    .string()
    .min(3, "username must be at least of 3 character ")
    .max(63, "username must be less then 63 characters")
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
      message: "user name can only contain lower case only",
    })

    .refine((val) => !val.includes("--"), "user cannot contain double hyphens ")
    .transform((val) => val.toLowerCase()),
});
