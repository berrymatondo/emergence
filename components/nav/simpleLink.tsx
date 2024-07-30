"use client";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { RiDashboardLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

type SimpleLinkProps = {
  title?: any;
  link?: any;
  ex?: any;
  tp?: any;
  //chem?: any;
  icon?: any;
  role?: any;
};

const SimpleLink = ({
  title,
  link,
  ex,
  tp,
  //chem,
  icon,
  role,
}: SimpleLinkProps) => {
  const router = useRouter();

  //console.log("link", link);

  //${chem == "valorisation" ? "bg-green-600" : ""}

  return (
    <div className={`flex items-center`}>
      {ex ? (
        <>
          {/*           <Link
            href={"/" + link}
            className={`flex gap-4 m-1 ${
              role == "ADMIN" ? "text-orange-500" : ""
            }`}
          >
            {icon}
            <p className="font-medium text-md">{title}</p>{" "}
          </Link> */}
          <RiDashboardLine size={20} />
          <Button
            onClick={() => router.replace(link)}
            variant="empty"
            className="font-medium text-md"
          >
            {title}
          </Button>{" "}
        </>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/*            <Link href={"/" + link} className="flex gap-4 m-1 pl-4">
                {icon}
                <p className="font-medium text-md">{title}</p>{" "}
              </Link> */}
              <Button
                onClick={() => router.replace(link)}
                variant="empty"
                className="font-medium text-md"
              >
                <RiDashboardLine size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sky-888">{tp}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SimpleLink;
