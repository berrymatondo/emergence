"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { logoutUser } from "@/lib/_userActions";
import { signOut } from "next-auth/react";
import { Card } from "../ui/card";

type LogoutFormProps = {
  session: any;
};
const LogoutForm = ({ session }: LogoutFormProps) => {
  const router = useRouter();
  const [show, setShow] = useState(true);

  return (
    <div className="py-24">
      <Card className="border md:mx-96 p-8">
        {session && session.user && show && (
          <p className="my-4 text-center">
            <span className="">{"Etes-vous sûr de vouloir quitter ?"}</span>
          </p>
        )}

        {session && session.user && show && (
          <div className=" flex justify-center gap-8">
            <Button
              className=" px-2 text-red-600"
              onClick={() => router.back()}
              variant="empty"
            >
              Annuler
            </Button>

            <form
              action={async () => {
                //console.log(1);

                setShow(!show);
                // console.log(2);
                // await signOut();
                // console.log(3);
                logoutUser();
                // console.log(4);
                // console.log("in");

                window.location.reload;
                //console.log("out");
                // router.push("/");
                //console.log(5);
              }}
            >
              <Button
                className="px-2 "
                // onClick={() => router.push("/redirout")}
                type="submit"
              >
                Confirmer
              </Button>
            </form>
          </div>
        )}

        {(!session || !show) && (
          <p className=" text-center">
            <Link className="underline " href="/">
              {"Retour à la page d'accueil"}
            </Link>
          </p>
        )}
      </Card>
    </div>
  );
};

export default LogoutForm;
