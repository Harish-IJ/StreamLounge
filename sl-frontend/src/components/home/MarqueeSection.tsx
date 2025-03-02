import { Movie, TVshow } from "@/types";
import { Marquee } from "../magicui/marquee";
import MovieMarqueeCard from "../MovieMarqueeCard";
import { MovieDialogContent } from "./MovieCards";
import { useState } from "react";

const MarqueeSection = ({ movies }: { movies: Movie[] }) => {
  const FirstTen = movies.slice(0, 10);
  const LastTen = movies.slice(-10);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Movie | TVshow | null>(null);
  return (
    <>
      <MovieDialogContent movie={preview} onOpenChange={setOpen} open={open} />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {FirstTen.map((movie) => (
            <MovieMarqueeCard
              className="cursor-pointer"
              key={movie.id}
              movie={movie}
              onClick={() => {
                setPreview(movie);
                setOpen(true);
              }}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {LastTen.map((movie) => (
            <MovieMarqueeCard
              key={movie?.id}
              movie={movie}
              onClick={() => {
                setPreview(movie);
                setOpen(true);
              }}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </>
  );
};

export default MarqueeSection;
