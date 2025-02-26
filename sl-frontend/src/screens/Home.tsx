import NavCard from "@/components/appshell/NavCard";
import BlobedCard from "@/components/home/BlobedCard";
import Showcase from "@/components/home/Showcase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_HEADERS } from "@/constants/global-constants";
import { Separator } from "@/components/ui/separator";
import MarqueeSection from "@/components/home/MarqueeSection";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import Aurora from "@/components/magicui/Aurora";
import MovieDialog from "@/components/home/MovieDialog";
import { Movie } from "@/types";
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
import { useTheme } from "next-themes";
import { motion } from "motion/react";

const Home = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_HEADERS)
      ?.then((res) => setMovies(res.data?.results))
      ?.catch((err) => console.log(err));
  }, []);

  const handleSearch = React.useCallback(
    debounce(async (query) => {
      try {
        const url = query ? `${API_BASE_URL}/search/movie?query=${query}` : `${API_BASE_URL}/movie/top_rated`;

        const response = await axios.get(url, API_HEADERS);
        setSearchResults(response.data?.results);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 1000),
    [setSearchResults, API_HEADERS]
  );

  React.useEffect(() => {
    handleSearch(search);
    return () => {
      handleSearch.cancel();
    };
  }, [search, handleSearch]);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
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
        <BlobedCard className="col-span-2 md:col-span-6 lg:col-span-6" />
        <Card className="md:col-span-3 lg:col-span-3 z-10 grid">
          <p className="text-2xl relative right-4 place-self-end">#2</p>
        </Card>
        <Card className="md:col-span-3 lg:col-span-1 z-10 grid">
          <p className="text-2xl relative right-4 place-self-end">#3</p>
        </Card>
        <div className="col-span-2 grid gap-3 md:col-span-2 lg:col-span-4 z-10">
          <Card>
            <CardHeader>Stats Card 1</CardHeader>
            <CardContent>contents if any</CardContent>
          </Card>
          <Card>
            <CardHeader>Stats Card 2</CardHeader>
            <CardContent>contents if any</CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div>
        <MarqueeSection movies={movies} />
      </div>
      {/* SEARCH SECTION */}
      <div className="grid w-full h-full">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
        <div className="flex flex-col items-center gap-2">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for a movie..." />
        </div>
        <div className="grid grid-cols-5 gap-4 m-8">
          {searchResults?.length > 0 &&
            searchResults.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="w-full h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                <MovieDialog movie={movie} />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
