import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

type IconButtonProps = React.ComponentProps<typeof Button> & {
  icon?: React.ReactNode;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, className, children, ...buttonProps }) => {
  return (
    <Button {...buttonProps} className={cn("flex items-center gap-2", className)}>
      {icon}
      {children}
    </Button>
  );
};

export default IconButton;
