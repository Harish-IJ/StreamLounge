import { cn } from "@/lib/utils";
import { Heart, Home, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ActionBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="fixed z-50 bg-background/40 border rounded-lg p-1  flex items-center gap-2  bottom-8 right-11 backdrop-blur-xs">
      <div
        className="hover:text-indigo-400 cursor-pointer transition-all duration-500  rounded-md p-2"
        onClick={() => navigate("/")}>
        <Home size={14} />
      </div>
      <div
        className="hover:text-yellove-300 cursor-pointer transition-all duration-500  rounded-md p-2"
        onClick={() => {
          navigate("/");
          setTimeout(() => {
            const searchElement = document.getElementById("search-bar");
            if (searchElement) searchElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          }, 100);
        }}>
        <Search size={14} />
      </div>
      <div
        className={cn(
          "hover:text-rose-400 cursor-pointer transition-all duration-500  rounded-md p-2",
          location.pathname === "/favorites" && "text-rose-400  bg-rose-400/20"
        )}
        onClick={() => navigate("/favorites")}>
        <Heart size={14} />
      </div>
    </div>
  );
};

export default ActionBar;
