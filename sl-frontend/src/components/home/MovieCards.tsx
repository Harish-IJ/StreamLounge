import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Movie, TVshow } from "@/types";
import { cn, truncater } from "@/lib/utils";
import { Button } from "../ui/button";
import TiltedCard from "../magicui/TiltedCard";
import { Separator } from "../ui/separator";
import { motion } from "motion/react";

// Type guard functions to differentiate between Movie and TVshow
function isMovie(media: Movie | TVshow | null | undefined): media is Movie {
  return media !== null && media !== undefined && "title" in media;
}

function isTVShow(media: Movie | TVshow | null | undefined): media is TVshow {
  return media !== null && media !== undefined && "name" in media;
}

interface MovieTriggerProps {
  movie: Movie | TVshow | null;
  onClick: () => void;
  imageClassName?: string;
}

const MovieTrigger: React.FC<MovieTriggerProps> = ({ movie, onClick, imageClassName }) => {
  if (!movie) {
    return (
      <div className="w-full h-full rounded-2xl overflow-clip bg-[#121212] p-4 flex items-center justify-center">
        No media data available
      </div>
    );
  }

  // Get title based on media type
  const getTitle = () => (isMovie(movie) ? movie.title : isTVShow(movie) ? movie.name : "Unknown Title");

  // Get release year based on media type
  const getReleaseYear = () => {
    if (isMovie(movie) && movie.release_date) {
      return movie.release_date.slice(0, 4);
    } else if (isTVShow(movie) && movie.first_air_date) {
      return movie.first_air_date.slice(0, 4);
    }
    return "N/A";
  };

  return (
    <div onClick={onClick} className={cn("w-full h-full cursor-pointer rounded-2xl overflow-clip bg-[#121212] p-4")}>
      <div className="grid group h-full">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={getTitle()}
            className={cn(imageClassName, "row-start-1 col-start-1 rounded-2xl w-full h-full object-cover")}
          />
        ) : (
          <div className="row-start-1 flex items-center justify-center col-start-1 rounded-2xl w-full h-full bg-gradient-to-b from-tomato-400 ">
            No Poster Available
          </div>
        )}
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
          <p>{truncater({ text: getTitle(), limit: 20 })}</p>
          <div className="flex items-center gap-2">
            <p className="text-[10px] italic text-gray-300">{getReleaseYear()}</p>
          </div>
          <Button className="w-full mt-2" size={"sm"}>
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MovieDialogContentProps {
  movie: Movie | TVshow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MovieDialogContent: React.FC<MovieDialogContentProps> = ({ movie, open, onOpenChange }) => {
  // Early return if movie is null
  if (!movie) {
    return null;
  }

  // Get title based on media type
  const getTitle = () => (isMovie(movie) ? movie.title : isTVShow(movie) ? movie.name : "Unknown Title");

  // Get release year based on media type
  const getReleaseYear = () => {
    if (isMovie(movie) && movie.release_date) {
      return movie.release_date.slice(0, 4);
    } else if (isTVShow(movie) && movie.first_air_date) {
      return movie.first_air_date.slice(0, 4);
    }
    return "N/A";
  };

  const [isFav, setIsFav] = React.useState<boolean>(false);

  // Safely check favorites
  const checkFavorites = () => {
    try {
      const favoritesStr = localStorage.getItem("favorites");
      if (!favoritesStr) return false;

      const favorites = JSON.parse(favoritesStr);
      if (!Array.isArray(favorites)) return false;

      return favorites.some((fav: Movie | TVshow) => fav.id === movie.id);
    } catch (error) {
      console.error("Error checking favorites:", error);
      return false;
    }
  };

  const handleAddToFav = (mediaItem: Movie | TVshow) => {
    try {
      const favoritesStr = localStorage.getItem("favorites");
      const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];

      if (!Array.isArray(favorites)) {
        console.error("Favorites is not an array");
        return;
      }

      if (!isFav) {
        favorites.push(mediaItem);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        const updatedFavorites = favorites.filter((fav: Movie | TVshow) => fav.id !== mediaItem.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
      setIsFav(!isFav);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  React.useEffect(() => {
    if (!movie) return;
    setIsFav(checkFavorites());
  }, [movie]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] bg-background/80 backdrop-blur-sm">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogTitle className="text-lg leading-none font-semibold mb-4">{getTitle()}</DialogTitle>
          <div className="flex gap-6 w-full">
            {movie.poster_path ? (
              <TiltedCard
                imageSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                altText={getTitle()}
                captionText={getTitle()}
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
                  <p className="bg-tomato-600/60 backdrop-blur-sm rounded-sm px-4">{movie.vote_count} votes</p>
                }
              />
            ) : (
              <div className="flex items-center justify-center bg-gradient-to-b from-tomato-400 via-tomato-400/20 backdrop-blur-sm rounded-sm px-4 h-[450px] w-[300px]">
                No Poster Available
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div>
                <p>Overview</p>
                <Separator className="my-2.5" />
                <p className="text-sm max-h-76 overflow-y-auto">{movie.overview ?? "No overview available"}</p>
              </div>
              <div className="flex items-center gap-4 text-sm tracking-wider mt-auto ml-auto">
                <p className="text-tomato-500 uppercase font-extrabold">{movie.original_language || "Unknown"}</p>
                <p className="text-gray-400 italic">{getReleaseYear()}</p>
                <p className="text-yellove-500 font-bold">{movie.vote_average?.toFixed(1)}</p>
              </div>
              <Button
                variant={isFav ? "destructive" : "default"}
                onClick={() => handleAddToFav(movie)}
                className={cn(
                  "transition-shadow duration-250 ease-out",
                  !isFav ? "hover:shadow-[0px_8px_20px_-10px_#fff]" : "shadow-none"
                )}>
                {isFav ? "Remove from favourites" : "Add to favourites"}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export { MovieTrigger, MovieDialogContent };
