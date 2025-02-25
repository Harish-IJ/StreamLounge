import { Movie } from "@/types";
import { Marquee } from "../magicui/marquee";
import MovieMarqueeCard from "../MovieMarqueeCard";

const MarqueeSection = ({ movies }: { movies: Movie[] }) => {
  const FirstTen = movies.slice(0, 10);
  const LastTen = movies.slice(-10);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {FirstTen.map((movie) => (
          <MovieMarqueeCard key={movie.id} movie={movie} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {LastTen.map((movie) => (
          <MovieMarqueeCard key={movie.id} movie={movie} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default MarqueeSection;
