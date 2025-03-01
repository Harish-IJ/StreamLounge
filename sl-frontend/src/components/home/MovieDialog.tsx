import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Movie } from "@/types";
import { cn, truncater } from "@/lib/utils";
import { Button } from "../ui/button";
import TiltedCard from "../magicui/TiltedCard";
import { Separator } from "../ui/separator";
import { motion } from "motion/react"; // Import Framer Motion

interface MovieDialogProps extends React.ComponentProps<typeof Dialog> {
  movie: Movie;
  imageClassName?: string;
}

const MovieDialog = ({ movie, imageClassName, ...props }: MovieDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild className={cn("w-full h-full cursor-pointer rounded-2xl overflow-clip bg-[#121212] p-4")}>
        <div className={cn("w-full h-full cursor-pointer rounded-2xl overflow-clip bg-[#121212] p-4")}>
          <div className="grid group">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={cn(imageClassName, "row-start-1 col-start-1 rounded-2xl")}
            />
            <div
              className={cn(
                "row-start-1 col-start-1 backdrop-brightness-125 z-10 transition-all duration-500 ease-in-out group-hover:opacity-0",
                movie.adult ? " backdrop-blur-md" : " backdrop-blur-xs opacity-50"
              )}
            />
            <div className="row-start-1 col-start-1 bg-gradient-to-t from-black to-transparent z-20 transition-all duration-500 ease-in-out " />

            <p className="row-start-1 col-start-1 z-30 text-sm font-light m-2.5 justify-self-end bg-black/40 backdrop-blur-sm rounded-lg h-8 px-2.5 py-1.5 group-hover:from-tomato-400/60 group-hover:to-yellove-400/30 group-hover:bg-gradient-to-tl transition-colors duration-500 ease-out">
              {movie.vote_average.toFixed(1)}
            </p>

            <div className="row-start-1 col-start-1 z-30 text-xl tracking-wide p-4 self-end space-y-1">
              <p>{truncater({ text: movie.title, limit: 20 })}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] italic text-gray-300">{movie.release_date.slice(0, 4)}</p>
              </div>
              <Button className="w-full mt-2" size={"sm"}>
                See More
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] bg-background/80 backdrop-blur-sm">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          {/* About Movie */}
          <DialogTitle className="text-lg leading-none font-semibold mb-4">{movie.title}</DialogTitle>
          <div className="flex gap-6 w-full">
            <TiltedCard
              imageSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              altText={movie.title}
              captionText={movie.title}
              containerHeight="450px"
              containerWidth="300px"
              imageHeight="450px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={0.9}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent
              overlayContent={
                <p className="bg-tomato-600/60 backdrop-blur-sm rounded-sm px-4">{movie?.vote_count} votes</p>
              }
            />
            <div className="flex flex-col gap-4">
              <div>
                <p>Overview</p>
                <Separator className="my-2.5" />
                <p className="text-sm max-h-76 overflow-y-auto">{movie?.overview || "No overview available"}</p>
              </div>
              <div className="flex items-center gap-4 text-sm tracking-wider mt-auto ml-auto">
                <p className="text-tomato-500 uppercase font-extrabold">{movie.original_language}</p>
                <p className="text-gray-400 italic">{movie.release_date.slice(0, 4)}</p>
                <p className="text-yellove-500 font-bold">{movie.vote_average.toFixed(1)}</p>
              </div>
              <Button className="hover:shadow-[0px_8px_20px_-10px_#fff] transition-shadow duration-250 ease-out">
                Add to Watchlist
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDialog;
