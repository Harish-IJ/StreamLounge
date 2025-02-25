import { cn, truncater } from "@/lib/utils";
import React from "react";
import { StarIcon } from "lucide-react";
import { Movie } from "@/types";

export interface MovieMarqueeCardProps extends React.ComponentProps<"div"> {
  movie: Movie;
}

const MovieMarqueeCard = (props: MovieMarqueeCardProps) => {
  return (
    <div {...props} className={cn(props.className, "grid bg-[#191919] rounded-lg max-w-sm ")}>
      <div className="flex items-center flex-row gap-8 col-start-1 row-start-1 p-2 z-10">
        <img
          src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`}
          alt={props.movie.title}
          className="rounded-md max-w-14"
        />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">{truncater({ text: props.movie.title, limit: 30 })}</h4>
            <p className="text-xs flex items-center gap-1.5 tracking-widest font-semibold">
              <StarIcon size={12} className="mb-1 fill-yellove-400 text-yellove-400" />
              {props.movie.vote_average.toFixed(1)}
            </p>
          </div>
          <p className="text-xs  font-extralight italic">{truncater({ text: props.movie.overview, limit: 80 })}</p>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path})` }}
        className="col-start-1 row-start-1 rounded-lg blur-3xl "
      />
    </div>
  );
};

export default MovieMarqueeCard;
