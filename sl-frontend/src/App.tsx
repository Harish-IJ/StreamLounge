import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/Home";
import SideBar from "./components/appshell/SideBar";
import { ThemeProvider } from "./components/ui/theme-provider";
const App = () => {
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
