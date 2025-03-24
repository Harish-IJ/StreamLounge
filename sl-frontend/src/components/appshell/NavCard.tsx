import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import IconButton from "./Text";
import { Heart, Home, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { BorderBeam } from "../magicui/border-beam";
import StreamLoungeText from "@/assets/StreamLoungeText.svg";

const NAVS = [
  {
    label: "Home",
    route: "/",
    icon: Home,
  },
  {
    label: "Search",
    route: "/",
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
  // const { register, handleSubmit, formState, reset, control, setValue } = useForm();
  const navigate = useNavigate();
  return (
    <Card {...props} className={cn(props?.className, "backdrop-blur-sm ")}>
      <CardHeader>
        <div>
          <img src={StreamLoungeText} alt="StreamLounge" className="h-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-1.5">
        <div className="mx-3">
          <Separator className="mb-4" />
        </div>
        {NAVS.map((nav) => (
          <IconButton
            key={nav.label}
            icon={<nav.icon className="mt-0.5" size={14} />}
            onClick={() => {
              navigate(nav.route);
              if (nav.label === "Search") {
                setTimeout(() => {
                  const element = document.getElementById("search-bar");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }, 100);
              }
            }}>
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
              <p>
                Im currently integrating a common feedback db for all my project showcase, So far its a work in progress
              </p>
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
