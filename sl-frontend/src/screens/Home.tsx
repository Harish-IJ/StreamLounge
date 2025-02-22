import NavCard from "@/components/appshell/NavCard";
import BlobedCard from "@/components/home/BlobedCard";
import Showcase from "@/components/home/Showcase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import axios from "axios";
import { API_BASE_URL, API_HEADERS, KEY } from "@/constants/global-constants";

const Home = () => {
  React.useEffect(() => {
    try {
      axios
        .get(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_HEADERS)
        ?.then((res) => console.log(res?.data, "Response"))
        ?.catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
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
    </div>
  );
};

export default Home;
