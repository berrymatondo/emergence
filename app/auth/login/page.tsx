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

import { GiSuspensionBridge } from "react-icons/gi";

export default function LoginForm() {
  const router = useRouter();
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
            <strong className="text-9xl max-md:text-7xl">E</strong>
            <div className="leading-10 flex flex-col items-start justify-center">
              <span className="pt-1 text-6xl max-md:text-2xl">merging</span>
              <span className="text-4xl max-md:text-xl md:py-4">
                <strong>M</strong>arkets
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm max-md:text-xs text-center md:hidden">
          Connecting You To Tomorrow’s Market Leaders
        </p>
        <Card className="max-md:my-4 my-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            <CardDescription className=" text-center">
              Enter votre utilisateur et votre mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
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
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Se Connecter</Button>
          </CardFooter>
        </Card>
      </div>
      <p className="text-sm text-center max-md:hidden">
        Connecting You To Tomorrow’s Market Leaders
      </p>
    </div>
  );
}
