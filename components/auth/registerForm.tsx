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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { GiSuspensionBridge } from "react-icons/gi";
import { RegisterSchema } from "@/lib/schemas";
import { registerUser, updateUser } from "@/lib/_userActions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CountryList, UserRoles, UserStatuses } from "@prisma/client";

type RegisterFormProps = {
  usr?: any;
};

export default function RegisterForm({ usr }: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      id: usr?.id ? usr.id : undefined,
      username: usr ? usr.username : "",
      email: usr ? usr.email : "",
      password: usr ? "******" : "",
      confirmPassword: usr ? "******" : "",
      role: usr ? usr.role : "CLIENT",
      status: usr ? usr.status : "INACTIF",
      country: usr ? usr.country : "ALL",
    },
  });

  // Regsiter function
  const procesForm = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    //console.log("Value: ", values);
    //  console.log("usr: ", usr);

    let res;
    if (usr) res = await updateUser(values);
    else res = await registerUser(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res?.error) {
      setLoading(false);
      toast.error(` ${res?.error}`, {
        description: new Date().toISOString().split("T")[0],
      });
      return;
    }

    if (usr)
      toast.success(
        `Les données de l'utilisateur ${values.username} ont été modifiées avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    else
      toast.success(
        `L'utilisateur ${values.username}  a été créé avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );

    setLoading(false);
    router.push("/admin/users");
  };

  return (
    <div className="w-full">
      <div className="flex max-md:flex-col w-full justify-center max-md:px-2 md:container md:px-36 md:py-24">
        <div
          className="overflow-hidden relative w-full hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          <GiSuspensionBridge
            size={400}
            className="max-md:hidden opacity-40 text-sky-600"
          />

          <div className="md:hidden flex justify-center ">
            <GiSuspensionBridge
              size={50}
              className="md:hidden opacity-70 text-sky-600 dark:text-white"
            />
          </div>
          <div
            className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2
  flex max-md:justify-center text-teal-700 text-xl font-bold"
          >
            {/*             <strong className="text-9xl max-md:text-7xl">E</strong>
             */}{" "}
            <div className="leading-10 flex flex-col items-start justify-center">
              <span className="pt-1 text-8xl max-md:text-2xl">Emergence</span>
              {/*               <span className="text-4xl max-md:text-xl md:py-4">
                <strong>M</strong>arkets
              </span> */}
            </div>
          </div>
        </div>
        <p className="text-sm max-md:text-xs text-center md:hidden">
          Connecting You To Tomorrow’s Market Leaders
        </p>
        <Card className="max-md:my-4 my-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {usr ? "Editer un utilisateur" : "Inscription"}
            </CardTitle>
            <CardDescription className=" text-center">
              Remplir correctement ce formulaire.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="md:flex md:gap-2 md:justify-between">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Nom d'utilisateur"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le nom de l'utilisateur"
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
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Email"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer une adresse mail"
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className="md:flex md:gap-2 md:justify-between">
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

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Confirmation mot de passe"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Confirmer le mot de passe"
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  {usr && (
                    <div className="flex justify-between gap-2">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Profil</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Sélectionner un profil" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(UserRoles)?.map((ur: any) => (
                                    <SelectItem key={ur} value={ur}>
                                      {ur}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Statut</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Sélectionner un profil" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(UserStatuses)?.map(
                                    (ur: any) => (
                                      <SelectItem key={ur} value={ur}>
                                        {ur}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>Pays</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Sélectionner un pays" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Object.values(CountryList)?.map(
                                    (ur: any) => (
                                      <SelectItem key={ur} value={ur}>
                                        {ur}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  )}

                  {/*             {usr && (
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Pays</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {countries?.map((ctr: Country) => (
                            <SelectItem key={ctr.id} value={ctr.id.toString()}>
                              {ctr.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )} */}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="w-full"
                    variant="cancel"
                    onClick={() => router.back()}
                  >
                    {"Annuler"}
                  </Button>

                  <Button type="submit" className="w-full">
                    {loading ? "En cours de traitement ..." : "Enregistrer"}
                  </Button>
                </div>
              </form>
            </Form>
            {/*             <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div> */}
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
}
