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

// STRAIGHT
export const StraightSchema = z.object({
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
  label: z.string().optional(),
});

// FLOATING
export const FloatingSchema = z.object({
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
  label: z.string().optional(),
});

// STEP UP
export const StepUpSchema = z.object({
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
  label: z.string().optional(),
});

//DUAL
export const SBSchema = z.object({
  price: z.string().optional(),
  bondMaturityDate: z.string().optional(),
  couponCurrency: z.string().optional(),
  couponCurrency2: z.string().optional(),
  couponRate: z.string().optional(),
  couponFrequency: z.string().optional(),
  firstCouponDate: z.string().optional(),
  couponBasis: z.string().optional(),
  valuationDate: z.string().optional(),
  notional: z.string().optional(),
  forcedBondPrice: z.boolean().default(false),
  curveType: z.enum(["zcc", "yic", "inc"]),
  curveType2: z.enum(["zcc", "yic", "inc"]),
  curveTypeName: z.string().optional(),
  liquidityPremium: z.string().optional(),
  liquidityPremium2: z.string().optional(),
  defaultCountry: z.string().optional(),
  defaultCountry2: z.string().optional(),
  label: z.string().optional(),
});

// COMMO
export const CommoSchema = z.object({
  price: z.string().optional(),
  bondMaturityDate: z.string().optional(),
  couponCurrency: z.string().optional(),
  fixedCoupon: z.string().optional(),
  maxCoupon: z.string().optional(),
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
  label: z.string().optional(),
});

//////////////////////////

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
  curveType2: z.enum(["zcc", "yic", "inc"]),
  curveTypeName: z.string().optional(),
  liquidityPremium: z.string().optional(),
  liquidityPremium2: z.string().optional(),
  defaultCountry: z.string().optional(),
  defaultCountry2: z.string().optional(),
  label: z.string().optional(),
});

export const AStraightSchema = z.object({
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
  label: z.string().optional(),
});

export const AFloatingSchema = z.object({
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
  label: z.string().optional(),
});

// Amo. COMMO
export const ACommoSchema = z.object({
  price: z.string().optional(),
  bondMaturityDate: z.string().optional(),
  couponCurrency: z.string().optional(),
  fixedCoupon: z.string().optional(),
  maxCoupon: z.string().optional(),
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
  label: z.string().optional(),
});
