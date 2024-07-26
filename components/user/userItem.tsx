"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";

type UserItemProps = {
  usr: any;
};

const UserItem = ({ usr }: UserItemProps) => {
  console.log("usr: ", usr);

  const router = useRouter();
  return (
    <div
      key={usr.id}
      className="border-b border-gray-400/40 gap-2 flex justify-between shadow-md md:my-2 md:py-2 max-md:m-2  hover:cursor-pointer"
    >
      <div
        onClick={() => router.push(`/admin/users/${usr.id}`)}
        className=" grid grid-cols-3 "
      >
        <div className="relative col-span-2 flex flex-col items-start my-2 ml-2 ">
          <p className="max-md:text-xs text-sm ">{usr.username}</p>
          <p className="italic text-blue-600 max-md:text-xs text-sm">
            {usr.role}{" "}
            <span className="text-xs text-black dark:text-teal-600">
              ({usr?.country ? usr.country.name : ""})
            </span>
          </p>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        <p
          className={
            usr.status == "ACTIF"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-green-600"
              : usr.status == "INACTIF"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-red-500"
              : "w-20 text-center text-xs py-1 px-2 rounded-full bg-orange-500"
          }
        >
          {usr.status}
        </p>
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() => router.push(`/admin/users/delete/${usr.id}`)}
          size={30}
        />

        <BiEditAlt
          onClick={() => router.push(`/admin/users/update/${usr.id}`)}
          className="text-gray-600"
          size={30}
        />
      </div>
      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        <p
          className={
            usr.status == "ACTIF"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-green-600"
              : usr.status == "INACTIF"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-red-500"
              : "w-20 text-center text-xs py-1 px-2 rounded-full bg-orange-500"
          }
        >
          {usr.status}
        </p>
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() => router.push(`/admin/users/delete/${usr.id}`)}
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/users/update/${usr.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default UserItem;
