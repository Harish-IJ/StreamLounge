import React from "react";

const Favorites = () => {
  const [favs, setFavs] = React.useState([]);

  React.useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem("favorites") ?? "[]"));
  }, []);
  return (
    <div>
      <p>Favorites</p>
      {favs.length > 0 ? (
        favs.map((f: any) => {
          return (
            <div key={f.id} className="flex items-center justify-center">
              <p>{f.title}</p>
            </div>
          );
        })
      ) : (
        <div>
          <p>No favorites</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
