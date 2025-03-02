import NavCard from "@/components/appshell/NavCard";
import BlobedCard from "@/components/home/BlobedCard";
import Showcase from "@/components/home/Showcase";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import axios from "axios";
import { API_BASE_URL, API_HEADERS } from "@/constants/global-constants";
import { Separator } from "@/components/ui/separator";
import MarqueeSection from "@/components/home/MarqueeSection";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import Aurora from "@/components/magicui/Aurora";
import { Movie, TVshow } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { truncater } from "@/lib/utils";
import ShinyText from "@/components/magicui/ShinyText";
import { Loader2, SearchIcon } from "lucide-react";
import { MovieDialogContent, MovieTrigger } from "@/components/home/MovieCards";

interface Media extends Movie {
  name: string;
  orignal_name: string;
}

const Home = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [topThree, setTopThree] = React.useState<Media[]>([]);
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [favAnime, setFavAnime] = React.useState<TVshow | null>(null);
  const favAnimeContainer = React.useRef<HTMLDivElement>(null);
  const [preview, setPreview] = React.useState<Movie | TVshow | null>(null);
  const [previewOpen, setPreviewOpen] = React.useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: favAnimeContainer,
    offset: ["start end", "end start"],
  });

  const favAnimeTextParallax = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const favAnimeParallax = useTransform(scrollYProgress, [0, 1], [0, 30]);

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_HEADERS)
      ?.then((res) => setMovies(res.data?.results))
      ?.catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/trending/all/day`, API_HEADERS)
      ?.then((res) => setTopThree(res.data?.results))
      ?.catch((err) => console.log(err));
  }, []);

  const handleSearch = React.useCallback(
    debounce(async (query) => {
      setLoading(true);
      try {
        const url = query ? `${API_BASE_URL}/search/movie?query=${query}` : `${API_BASE_URL}/movie/top_rated`;
        const response = await axios.get(url, API_HEADERS);
        setSearchResults(response.data?.results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [setSearchResults, API_HEADERS]
  );

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/search/movie?query=death note`, API_HEADERS)
      ?.then((res) => setFavAnime(res.data?.results[0]))
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    handleSearch(search);
    return () => {
      handleSearch.cancel();
    };
  }, [search, handleSearch]);

  return (
    <div className="space-y-6">
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Hey there 👋</DialogTitle>
          <DialogHeader>Welcome to StreamLounge !</DialogHeader>
          <DialogDescription>The site is in progress !</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button>No judging now</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-8 lg:grid-cols-12 ">
        <NavCard className="hidden md:block md:col-span-2" />
        <Showcase className="col-span-2 md:row-start-3 md:col-span-8 lg:row-start-2 z-10" />
        <BlobedCard
          movie={topThree?.[0]}
          className="col-span-2 md:col-span-6 lg:col-span-6"
          onClick={() => {
            setPreview(topThree?.[0]);
            setPreviewOpen(true);
          }}
        />
        <Card
          onClick={() => {
            setPreview(topThree?.[1]);
            setPreviewOpen(true);
          }}
          className="md:col-span-3 lg:col-span-3 z-10 grid bg-cover py-0 cursor-pointer"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${topThree?.[1]?.backdrop_path})` }}>
          <p className="text-2xl font-semibold col-start-1 row-start-1 p-3">
            {topThree?.[1]?.title
              ? truncater({ text: topThree?.[1]?.title, limit: 20 })
              : topThree?.[1]?.name
              ? truncater({ text: topThree?.[1]?.name, limit: 20 })
              : ""}
          </p>
          <div className="bg-gradient-to-t from-black/50 to-transparent col-start-1 row-start-1" />
          <p className="text-2xl relative right-4 place-self-end col-start-1 row-start-1">#2</p>
        </Card>
        <Card
          onClick={() => {
            setPreview(topThree?.[2]);
            setPreviewOpen(true);
          }}
          className="md:col-span-3 lg:col-span-1 z-10 grid bg-cover bg-center py-0 cursor-pointer"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${topThree?.[2]?.backdrop_path})` }}>
          <p className="text-2xl relative right-2 place-self-end row-start-1 col-start-1">#3</p>
        </Card>
        <div className="col-span-2 grid gap-3 md:col-span-2 lg:col-span-4 z-10">
          <Card
            className="py-0 grid rounded-2xl overflow-hidden cursor-pointer"
            ref={favAnimeContainer}
            onClick={() => {
              setPreview(favAnime);
              setPreviewOpen(true);
            }}>
            <p className="text-xs tracking-wide font-extralight row-start-1 col-start-1 z-20 p-3 self-end">
              Dev Special Mention
            </p>
            <motion.p
              style={{ y: favAnimeTextParallax }}
              className="text-2xl  row-start-1 col-start-1 z-20 p-3 place-self-end text-gray-400/80 font-semibold">
              Death Note
            </motion.p>
            <motion.div
              className="row-start-1 col-start-1 z-10 grad-mask-2 blur-2xl max-h-66 scale-125"
              style={{ y: favAnimeParallax }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${favAnime?.backdrop_path}`}
                alt="img"
                className="w-full h-full row-start-1 col-start-1 scale-125 object-cover"
              />
            </motion.div>
            <motion.div className="row-start-1 col-start-1 max-h-66 scale-125" style={{ y: favAnimeParallax }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${favAnime?.backdrop_path}`}
                alt="img"
                className="w-full h-full row-start-1 col-start-1 object-cover"
              />
            </motion.div>
          </Card>
          <Card className="py-0 bg-transparent border">
            <CardContent className="flex items-center justify-center h-full font-extralight text-muted-foreground/ tracking-wider">
              <ShinyText text="My first react project reimagined after 2 years" speed={6} />
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div>
        <MarqueeSection movies={movies} />
      </div>
      {/* SEARCH SECTION */}
      <div className="grid w-full h-full gap-6">
        <div className="absolute  w-[calc(100vw-3rem)]  -z-10">
          <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.8} amplitude={1.0} speed={0.3} />
        </div>
        <div className="flex items-center justify-around flex-col gap-2 mt-12">
          <p className="text-2xl text-foreground/70">Search for</p>
          <p className="text-4xl font-semibold">Movie/TV Shows</p>
        </div>
        <div className="mx-44 grid">
          <Input
            value={search}
            className="row-start-1 col-start-1"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie..."
          />
          <SearchIcon className="row-start-1 col-start-1 self-center place-self-end mr-3" size={14} />
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 p-3 mt-10">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              className="h-72 w-full flex items-center justify-center  col-span-2 md:col-span-3 lg:col-span-5">
              <Loader2 className="animate-spin" size={40} />
            </motion.div>
          )}
          {!loading &&
            searchResults?.length > 0 &&
            searchResults.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="md:max-w-2xs"
                initial={{ opacity: 0, y: -20, x: 10, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, x: 0, rotateX: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                <MovieTrigger
                  movie={movie}
                  onClick={() => {
                    setPreviewOpen(true);
                    setPreview(movie);
                  }}
                />
              </motion.div>
            ))}
          <MovieDialogContent movie={preview} open={previewOpen} onOpenChange={setPreviewOpen} />
          {!loading && searchResults?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-72 w-full flex items-center justify-center  col-span-2 md:col-span-3 lg:col-span-5">
              <p className="text-xl text-muted-foreground">What did you even type to be in this situation ???</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
