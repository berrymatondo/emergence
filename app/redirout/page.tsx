import { auth, signOut } from "@/auth";
import LogoutForm from "@/components/auth/logoutForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { logoutUser } from "@/lib/_userActions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const SignOutPage = async () => {
  const session = await auth();

  return (
    <LogoutForm session={session} />
    /*     <form
      action={async () => {
        setShow(!show);
        logoutUser();
        // console.log("in");

        //window.location.reload;
        //console.log("out");
        //router.refresh();
      }}
    >
      {session && session.user && show && (
        <p className="my-4 text-center">
          {"Etes-vous sûr de vouloir quitter ?"}
        </p>
      )}
      {session && session.user && show && (
        <div className=" flex justify-center gap-4 p-4">
          <Button
            className="md:hidden px-2 text-red-600"
            onClick={() => router.back()}
            variant="empty"
          >
            Annuler
          </Button>

          <Button
            className="md:hidden px-2 "
            // onClick={() => router.push("/redirout")}
            type="submit"
          >
            Confirmer
          </Button>
        </div>
      )}
      {(!session || !show) && (
        <p className=" text-center">
          <Link className="underline " href="/">
            {"Retour à la page d'accueil"}
          </Link>
        </p>
      )}
    </form> */
  );
};

export default SignOutPage;
