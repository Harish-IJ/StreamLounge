import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { HTMLAttributes } from "react";

const BlobedCard = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn(props.className, "grid")}>
      <Card className="row-start-1 col-start-1 bg-red-500"></Card>
      <div className="w-14 h-12 bg-background rounded-xl row-start-1 col-start-1 justify-self-end place-self-end relative before-blob"></div>
      <p className="row-start-1 col-start-1 justify-self-end place-self-end z-10 text-2xl relative right-4 -top-2">
        #1
      </p>
    </div>
  );
};

export default BlobedCard;
