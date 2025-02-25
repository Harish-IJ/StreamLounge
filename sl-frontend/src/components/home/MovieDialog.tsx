import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Movie } from "@/types";
import { cn } from "@/lib/utils";

interface MovieDialogProps extends React.ComponentProps<typeof Dialog> {
  movie: Movie;
  imageClassName?: string;
}

const MovieDialog = ({ movie, imageClassName, ...props }: MovieDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild className={cn("w-full cursor-pointer")}>
        <div>
          <div className={cn("h-64 w-64 grid overflow", imageClassName)}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="object-fill row-start-1 col-start-1  "
            />
            <div className="row-start-1 col-start-1 w-full h-24  self-end relative -top-32 backdrop-brightness-95 backdrop-blur-md"></div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>{/* About Movie */}</DialogContent>
    </Dialog>
  );
};

export default MovieDialog;
