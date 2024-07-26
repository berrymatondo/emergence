import { auth } from "@/auth";
import LoginForm from "@/components/auth/loginForm";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await auth();

  if (session && session.user) redirect("/overview");

  return <LoginForm />;
};

export default LoginPage;
