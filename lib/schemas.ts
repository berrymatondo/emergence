import * as z from "zod";

export const RegisterSchema = z
  .object({
    id: z.number().optional(),
    email: z.string().min(1, {
      message: "L'adresse email est obligatoire",
    }),
    username: z.string().min(1, {
      message: "Le nom d'utilisateur est obligatoire",
    }),

    role: z.string(),
    status: z.string(),
    country: z.string(),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Les mots de passe doivent correspondre",
      path: ["confirmPassword"],
    }
  );

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Le nom d'utilisateur est obligatoire",
  }),
  password: z.string().min(1, { message: "Le mot de pass est obligatoire" }),
});
/* 
export const ContactSchema = z.object({
  id: z.number().optional(),
  firstname: z.string().min(1, {
    message: "Le prénom est obligatoire",
  }),
  lastname: z.string().min(1, {
    message: "Le nom est obligatoire",
  }),
  email: z.string().min(1, {
    message: "L'adresse email est obligatoire",
  }),
  message: z.string().min(1, { message: "Le message est obligatoire" }),
  comments: z.string().optional(),
  status: z.string(),
});
 */
