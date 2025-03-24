import ActionBar from "@/components/ActionBar";
import React from "react";

const Favorites = () => {
  const [favs, setFavs] = React.useState([]);

  React.useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem("favorites") ?? "[]"));
  }, []);
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-4 p-4">
      <ActionBar />
      {favs?.length === 0 && <h1 className="text-2xl">No Favorites</h1>}
      {favs?.map((f: any) => {
        return (
          <div key={f.id} className="p-2 border rounded-lg grid grid-cols-[auto_1fr] gap-4 w-80">
            <div className="w-16">
              {f?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${f?.poster_path}`}
                  className="rounded-md"
                  alt={f?.title || f?.name}
                />
              ) : (
                <div className="flex items-center justify-center rounded-md w-full h-24 bg-gradient-to-b from-tomato-400 text-xs ">
                  No Poster
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1">{f?.title || f?.name}</p>
              <p className="text-xs text-yellove-400">Popularity: {f?.popularity.toFixed(1)}</p>
              <p className="text-xs text-gray-400 mt-auto ml-auto">
                Year: {f?.release_date?.slice(0, 4) || f?.first_air_date?.slice(0, 4) || "N/A"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
