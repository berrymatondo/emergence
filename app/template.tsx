"use client";
import React from "react";
import { motion } from "framer-motion";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className=" w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default Template;
