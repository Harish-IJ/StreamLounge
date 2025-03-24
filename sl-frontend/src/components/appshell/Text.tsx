import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

type IconButtonProps = React.ComponentProps<typeof Button> & {
  icon?: React.ReactNode;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, className, children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn("flex items-center gap-2 py-2 text-sm cursor-pointer rounded-lg px-4", className)}
      whileHover={{
        x: 8,
        transition: { duration: 0.2 },
      }}>
      {icon}
      {children}
    </motion.button>
  );
};

export default IconButton;
