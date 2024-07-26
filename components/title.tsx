import React from "react";

type TitleProps = {
  title: string;
  description?: string;
  position?: string;
  descPosition?: string;
};

const Title = ({ title, description, position, descPosition }: TitleProps) => {
  let pos;
  let desc;
  if (!position) {
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 items-start ";
    desc = "max-md:hidden  text-sm md:text-md text-blue-800 dark:text-white";
  } else {
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 " +
      position;
    desc =
      "max-md:hidden text-sm md:text-md text-blue-800 dark:text-white  text-center";
  }

  return (
    <div className={pos}>
      <h1 className="uppercase font-bold text-3xl max-md:text-lg text-sky-700 dark:text-sky-500 md:my-4">
        {title}
      </h1>
      <p className={desc}>{description}</p>
    </div>
  );
};

export default Title;
