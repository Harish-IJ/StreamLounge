import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
};

const IconButton = (props: Props) => {
  return (
    <Button
      onClick={props.onClick}
      variant={props.variant}
      size={props.size}
      className={(cn(props.className), "flex items-center gap-2")}>
      {props.icon}
      {props.children}
    </Button>
  );
};

export default IconButton;
