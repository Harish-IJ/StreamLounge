import { cn } from "@/lib/utils";
import React from "react";

const HeroText = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn("space-y-2", props.className)}>
      <div className="flex items-center gap-4">
        <p className="text-6xl font-semibold">Find, Like</p>
        <div className="w-42 mt-1 h-16 bg-foreground rounded-full"></div>
        <p className="text-6xl font-semibold">Enjoy.</p>
      </div>
      <p className="mt-0.5">Your best movies - All in One Place!</p>
    </div>
  );
};

export default HeroText;
