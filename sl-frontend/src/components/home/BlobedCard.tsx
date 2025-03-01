import { cn, truncater } from "@/lib/utils";
import { Card } from "../ui/card";
import { Movie } from "@/types";

interface BlobedCardProps extends React.ComponentProps<"div"> {
  movie: Movie;
}

const BlobedCard = (props: BlobedCardProps) => {
  return (
    <div {...props} className={cn(props.className, "grid group overflow-hidden rounded-2xl cursor-pointer")}>
      <Card
        className="row-start-1 col-start-1 min-h-48 py-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props?.movie?.backdrop_path})`,
          backgroundSize: "cover",
        }}></Card>
      <div className="w-14 h-12 bg-background rounded-xl row-start-1 col-start-1 justify-self-end place-self-end relative before-blob"></div>
      <p className="row-start-1 col-start-1 justify-self-end place-self-end z-20 text-2xl relative right-4 -top-2 group-hover:rotate-180 transition-all duration-500 ease-in-out">
        #1
      </p>
      <p className="row-start-1 col-start-1 backdrop-brightness-105 p-3 z-20 font-medium text-2xl">
        {props?.movie?.title && truncater({ text: props?.movie?.title, limit: 20 })}
      </p>
      <div className="row-start-1 col-start-1 bg-gradient-to-r backdrop-blur-[0.5px] group-hover:backdrop-blur-none from-black/40 to-transparent z-10"></div>
      <p className="row-start-1 col-start-1 self-end italic text-xs p-4 z-20">Top Trending</p>
    </div>
  );
};

export default BlobedCard;
