import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import IconButton from "./Text";
import { Heart, Home, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { BorderBeam } from "../magicui/border-beam";

const NAVS = [
  {
    label: "Home",
    route: "/",
    icon: Home,
  },
  {
    label: "Search",
    route: "/search",
    icon: Search,
  },
  {
    label: "Favorites",
    route: "/favorites",
    icon: Heart,
  },
];

const NavCard = (props: React.ComponentProps<"div">) => {
  // TODO: using react hook form get user name & ratings
  const { register, handleSubmit, formState, reset, control, setValue } = useForm();
  const navigate = useNavigate();
  return (
    <Card {...props} className={cn(props?.className)}>
      <CardHeader className="flex-row gap-0.5">
        <span className="font-bold">Stream</span>Lounge
      </CardHeader>
      <CardContent className="space-y-2 px-1.5">
        <div className="mx-3">
          <Separator className="mb-4" />
        </div>
        {NAVS.map((nav) => (
          <IconButton
            key={nav.label}
            icon={<nav.icon className="mt-0.5" />}
            variant="link"
            className={""}
            size="sm"
            onClick={() => navigate(nav.route)}>
            {nav.label}
          </IconButton>
        ))}
      </CardContent>
      <CardFooter className="mt-10 pb-2">
        <Dialog>
          <DialogTrigger asChild>
            <InteractiveHoverButton className="text-sm">Yourself</InteractiveHoverButton>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Happy to see you hop around !!</DialogTitle>
            <DialogDescription>
              Enter any name you like & a honest rating with a review is always appreciated
            </DialogDescription>
            <form></form>
            <BorderBeam
              size={150}
              initialOffset={15}
              className="from-transparent via-yellove-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default NavCard;
