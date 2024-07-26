"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { checkAuth, deleteUser } from "@/lib/_userActions";

type UserFormDeleteProps = {
  usr: any;
};

const UserFormDelete = ({ usr }: UserFormDeleteProps) => {
  const router = useRouter();

  //console.log("USRUSR: ", usr);

  const form = useForm({
    defaultValues: {
      id: usr?.id ? usr.id : undefined,
      username: usr?.username ? usr?.username : "",
      //  lastname: per?.lastname ? per?.lastname : "",
    },
  });

  const procesForm = async () => {
    const res = await deleteUser(usr.id);
    //const res = await checkAuth("x");

    //console.log("RES:", res);

    if (res?.status == "KO") {
      toast.error(res.msg, {
        description: new Date().toISOString().split("T")[0],
      });
    } else {
      if (!res) {
        console.log("Une erreur est srvenue...");
      }
      toast.success(
        `L'utilisateur ${usr.username}  a été supprimé avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    }

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */

    router.push("/admin/users");
  };

  return (
    <div>
      <p className="text-center mb-4">
        {"Etes-vous sûr(e) de vouloir supprimer l'utilisateur  "}{" "}
        <span className="font-semibold text-orange-600">{usr?.username}</span>{" "}
        {"?"}{" "}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="flex justify-between items-center max-md:mt-8">
            <Button
              type="button"
              variant="secondary"
              className="text-red-600 max-md:mt-4"
              onClick={() => router.back()}
            >
              Annuler
            </Button>

            <Button className="max-md:mt-4" type="submit">
              Confirmer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserFormDelete;
