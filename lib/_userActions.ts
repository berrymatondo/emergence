"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { LoginSchema, RegisterSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { CountryList, UserRoles, UserStatuses } from "@prisma/client";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

type Inputs = z.infer<typeof RegisterSchema>;

export const registerUser = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = RegisterSchema.safeParse(data);

  if (result.success) {
    const {
      username,
      email,
      role,
      status,
      country,
      password,
      confirmPassword,
    } = result.data;

    /*     console.log(
      "{email,name,isAdmin,  password, confirmPassword, celluleID }",
      username,
      email,
      role,
      password,
      confirmPassword
    ); */

    try {
      //const session = await auth();

      //console.log("SESSION", session);

      const foundUser = await prisma.user.findUnique({
        where: {
          username: data.username.toLowerCase(),
        },
      });

      if (foundUser) return { error: "Ce nom d'utilisateur est déjà utilisé" };

      const foundUser2 = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (foundUser2) return { error: "Cette adresse mail est déjà utilisée" };

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      //const userTmp: any = session?.user;

      //console.log("DATA++++", data);

      const user = await prisma.user.create({
        data: {
          username: data.username.toLowerCase(),
          email: data.email,
          password: hashedPassword,
          //role: data.role as UserRoles,
          //status: data.role as UserStatuses,
          //country: data.country as CountryList,
          //    companyId: data.companyId ? +data.companyId : null,
          // userId: userTmp ? (userTmp.id ? parseInt(userTmp.id) : null) : null,
        },
      });

      //console.log("OK user", user);

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// UPDATE USER
export const updateUser = async (data: Inputs) => {
  // console.log("update PERSONNNNNN:", data);

  const resut = RegisterSchema.safeParse(data);
  if (resut.success) {
    let test = data.password;

    if (test == "******") {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username.toLowerCase(),
            NOT: {
              id: data.id,
            },
          },
        });

        // console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà (2)" };

        const foundUser2 = await prisma.user.findUnique({
          where: {
            email: data.email,
            NOT: {
              id: data.id,
            },
          },
        });

        if (foundUser2)
          return { error: "Cette adresse mail est déjà utilisée (2)" };

        // Hash password
        // const hashedPassword = await bcrypt.hash("wwwwww", 12);

        // console.log("data:", data);

        const usr = await prisma.user.update({
          where: {
            id: data.id,
          },
          data: {
            username: data.username.toLowerCase(),

            role: data.role as UserRoles,
            status: data.status as UserStatuses,
            country: data.country as CountryList,
            email: data.email,
          },
        });
        // console.log("xxxxxxxxxxxxxxxxxxx");

        // console.log("usrusr:", usr);

        revalidatePath("/admin/users");

        return {
          success: true,
          data: usr,
        };
      } catch (error) {}
    } else {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username.toLowerCase(),
            NOT: {
              id: data.id,
            },
          },
        });

        //console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà (3)" };

        const foundUser2 = await prisma.user.findUnique({
          where: {
            email: data.email,
            NOT: {
              id: data.id,
            },
          },
        });

        if (foundUser2)
          return { error: "Cette adresse mail est déjà utilisée (3)" };

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const person = await prisma.user.update({
          where: {
            id: data.id ? +data.id : undefined,
          },
          data: {
            username: data.username.toLowerCase(),
            // companyId: data?.companyId ? +data?.companyId : undefined,
            country: data.country as CountryList,
            role: data.role as UserRoles,
            email: data.email,
            password: hashedPassword,

            //statut: data.status as CelStatuses,
            /*           respoId: data.respoId ? +data.respoId : undefined,
             */
          },
        });

        revalidatePath("/admin/users");

        return {
          success: true,
          data: person,
        };
      } catch (error) {}
    }
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    revalidatePath("/admin/users");

    return {
      success: true,
      data: users,
    };
  } catch (error) {}
};

// GET SPECIFIC USER
export const getUser = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};

// DELETE USER
export const deleteUser = async (userId: number) => {
  const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check;

  try {
    const user = await prisma.user.delete({
      where: {
        id: +userId,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: user,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

type Inputs3 = z.infer<typeof LoginSchema>;

export const loginlogin = async (data: Inputs3) => {
  //console.log("data", data);

  const result = LoginSchema.safeParse(data);

  if (result.success) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          username: data.username.toLowerCase(),
        },
      });

      //console.log("foundUser", foundUser);

      if (!foundUser) return { error: "Cet utilisateur n'existe pas" };

      const checkPass = await bcrypt.compare(data.password, foundUser.password);

      //console.log("checkPass:", checkPass);

      if (!checkPass) {
        return { error: "Le mot de passe est incorrect" };
      }

      // return { success: true, data: data };
    } catch (error) {}
  } else {
    return { success: false, error: result.error.format() };
  }

  //console.log("Call sinin", data);

  const res = await signIn("credentials", {
    ...data,
    redirectTo: "/overview",
  });

  // console.log("RESSSS", res);
};

// Logout
export const logoutUser = async () => {
  //  console.log("LOGOUTTTTTTTTTTTTTTTTTTTTTTTTTT");

  await signOut();
  // redirect("/");
};

export const checkAuth = async (role: string) => {
  const session = await auth();

  //console.log("AUTH SESSION:", session?.user);

  let user: any = session?.user;
  let status = "KO";
  if (user?.role == role) status = "OK";

  if (user?.status != "ACTIF") status = "KO";

  return {
    success: true,
    data: "",
    status: status,
    msg:
      status == "OK"
        ? ""
        : "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
  };
};
