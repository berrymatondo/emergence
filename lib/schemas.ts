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

export const SBSchema = z.object({
  price: z.string().optional(),
  bondMaturityDate: z.string().optional(),
  couponCurrency: z.string().optional(),
  couponRate: z.string().optional(),
  couponFrequency: z.string().optional(),
  firstCouponDate: z.string().optional(),
  couponBasis: z.string().optional(),
  valuationDate: z.string().optional(),
  notional: z.string().optional(),
  forcedBondPrice: z.boolean().default(false),
  curveType: z.enum(["zcc", "yic", "inc"]),
  curveTypeName: z.string().optional(),
  liquidityPremium: z.string().optional(),
  defaultCountry: z.string().optional(),
  /*   bondMaturityDate: z.string().min(1, {
    message: "Le nom d'utilisateur est obligatoire",
  }),
  couponCurrency: z
    .string()
    .min(1, { message: "Le mot de pass est obligatoire" }),
  couponRate: z.string().min(1, { message: "Le mot de pass est obligatoire" }),
  couponFrequency: z
    .string()
    .min(1, { message: "Le mot de pass est obligatoire" }),
  firstCouponDate: z
    .string()
    .min(1, { message: "Le mot de pass est obligatoire" }),
  couponBasis: z.string().min(1, { message: "Le mot de pass est obligatoire" }),
  valuationDate: z
    .string()
    .min(1, { message: "Le mot de pass est obligatoire" }),
  notional: z.string().min(1, { message: "Le mot de pass est obligatoire" }), */
});

export const ASBSchema = z.object({
  price: z.string().optional(),
  bondMaturityDate: z.string().optional(),
  couponCurrency: z.string().optional(),
  couponRate: z.string().optional(),
  couponFrequency: z.string().optional(),
  firstCouponDate: z.string().optional(),
  couponBasis: z.string().optional(),
  valuationDate: z.string().optional(),
  amortizationStartDate: z.string().optional(),
  amortizationFrequency: z.string().optional(),
  notional: z.string().optional(),
  forcedBondPrice: z.boolean().default(false),
  curveType: z.enum(["zcc", "yic", "inc"]),
  curveTypeName: z.string().optional(),
  liquidityPremium: z.string().optional(),
  defaultCountry: z.string().optional(),
});
