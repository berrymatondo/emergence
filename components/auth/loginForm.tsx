"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Label } from "../ui/label";
/* import { LoginSchema } from "@/schemas";
import { loginUser, loginlogin } from "@/actions/login"; */
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/schemas";
import { loginlogin } from "@/lib/_userActions";
import { useSession } from "next-auth/react";
import { GiSuspensionBridge } from "react-icons/gi";
import { TrendingUp } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //if (usr) router.push("/redirect");

  //const { name, setName } = useUserStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const procesForm = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    //console.log("Value: ", values);

    const result = await loginlogin(values);

    //

    //console.log("RESRES:", result);

    if (result?.error) {
      toast.error(result?.error.toString());
    }
    //console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    /*     if (result?.success) {
      //console.log({ data: result.data });
      toast.success("Utilisateur créé avec succès");
      form.reset();
      return;
    } else {
      //console.log(result?.error);
      toast.error(JSON.stringify(result?.error));
    } */

    // const session = await auth();
    // console.log("session user Name:", session?.user);

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex max-md:flex-col w-full justify-center max-md:px-2 md:container md:px-36 md:py-24">
        <div
          className="overflow-hidden relative w-full hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          {/*           <GiSuspensionBridge
            size={400}
            className="max-md:hidden opacity-40 text-sky-600"
          />

          <div className="md:hidden flex justify-center ">
            <GiSuspensionBridge
              size={50}
              className="md:hidden opacity-70 text-sky-600 dark:text-white"
            />
          </div> */}
          <div
            className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2
  flex max-md:justify-center text-teal-600 text-xl font-bold"
          >
            {/*       <strong className="text-9xl max-md:text-7xl">E</strong> */}
            <div className="max-md:hidden relative leading-10 flex flex-col items-start justify-center">
              <span className="pt-1 text-8xl max-md:text-4xl max-md:mb-24">
                <strong className="text-sky-600 text-[12rem]">E</strong>
                <strong className="text-[16rem]">M</strong>
              </span>
              <TrendingUp className="absolute text-white/40" size={400} />
              {/*               <span className="text-4xl max-md:text-xl md:py-4">
                <strong>M</strong>arkets
              </span> */}
            </div>

            <div className="md:hidden relative leading-10 flex flex-col items-start justify-center">
              <span className="pt-1 text-8xl max-md:text-4xl max-md:mb-24">
                <strong className="text-sky-600 text-[5rem]">E</strong>
                <strong className="text-[3rem]">mergence</strong>
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm max-md:text-xs text-center md:hidden">
          Connecting You To Tomorrow’s Market Leaders
        </p>
        <Card className="max-md:my-4 my-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{"Login"}</CardTitle>
            <CardDescription className=" text-center">
              {"Fill your username and password."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{"Utilisateur"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'utilisateur"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{"Mot de passe"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer un mot de passe"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button type="submit" className="text-white bg-sky-700 w-full">
                  {loading ? "En cours de connexion ..." : "Se Connecter"}
                </Button>
              </form>
            </Form>
          </CardContent>
          {/*           <CardFooter>
            <Button className="w-full">Se Connecter</Button>
          </CardFooter> */}
        </Card>
      </div>
      <p className="text-sm text-center max-md:hidden">
        Connecting You To Tomorrow’s Market Leaders
      </p>
    </div>
  );
};

export default LoginForm;
