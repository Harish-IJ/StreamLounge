import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import HeroText from "./HeroText";
import React from "react";

const Showcase = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn(props.className)}>
      <Card className="p-3 h-[52vh] grid">
        <HeroText className="self-end" />
      </Card>
    </div>
  );
};

export default Showcase;
