import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/Home";
import SideBar from "./components/appshell/SideBar";
import { ThemeProvider } from "./components/ui/theme-provider";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface LenisOptions {
  duration: number;
  easing: (t: number) => number;
  smooth: boolean;
  smoothTouch: boolean;
}

const App = () => {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 0.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
    } as LenisOptions);

    const animate = (time: number) => {
      lenis?.current?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis?.current?.destroy();
    };
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="sceen-lounge-theme">
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
