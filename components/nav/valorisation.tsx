import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type ValorisationProps = {
  st?: any;
  sd?: any;
  sl?: any;
  ic?: any;
  ex?: any;
  tp?: any;
  chem?: any;
  lk?: any;
  item?: any;
};

const Valorisation = ({
  st,
  sd,
  sl,
  ic,
  ex,
  tp,
  chem,
  lk,
  item,
}: ValorisationProps) => {
  //console.log("sb", st);
  //console.log("sb", chem);
  //console.log("item.link", item.link);

  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`flex items-center ${lk == chem ? "text-sky-600" : ""} `}
        >
          {ex ? (
            <div className="ml-1 flex items-center">
              {ic}
              <Button variant="empty" className="font-medium text-md">
                {st}
              </Button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Button variant="empty" className="font-medium text-md ml-1">
                    {ic}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-sky-888">{tp}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{st}</SheetTitle>
          <SheetDescription>{sd}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 my-8">
          {sl?.map((el: any) => (
            <SheetClose key={el.id} asChild>
              <Button
                className="dark:text-white bg-sky-700"
                onClick={() => router.replace(el.link)}
              >
                {el.title}
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Valorisation;
