import NavCard from "@/components/appshell/NavCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="m-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-8 lg:grid-cols-12 ">
        <NavCard className="hidden md:block md:col-span-2" />
        <Card className="col-span-2 md:row-start-3 md:col-span-8 lg:row-start-2">
          <CardHeader>Hero Card</CardHeader>
          <CardContent>contents if any</CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-6 lg:col-span-6">
          <CardHeader>#1 Card</CardHeader>
          <CardContent>contents if any</CardContent>
        </Card>
        <Card className="md:col-span-3 lg:col-span-3">
          <CardHeader>#2 Card</CardHeader>
          <CardContent>contents if any</CardContent>
        </Card>
        <Card className="md:col-span-3 lg:col-span-1">
          <CardHeader>#3 Card</CardHeader>
          <CardContent>contents if any</CardContent>
        </Card>
        <div className="col-span-2 grid gap-2 md:col-span-2 lg:col-span-4">
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
