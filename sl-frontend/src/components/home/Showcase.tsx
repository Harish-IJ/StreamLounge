import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import HeroText from "./HeroText";
import React from "react";
import { useScroll, useTransform, motion } from "motion/react";

const Showcase = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const container = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], [0, -70]);
  return (
    <div {...props} className={cn(props.className, "rounded-2xl overflow-hidden")} ref={container}>
      <Card className=" py-0 h-[52vh] grid col-start-1 row-start-1 grid-rows-2 bg-transparent">
        <motion.div className="col-start-1 row-start-1 grid" style={{ y: imgParallax }}>
          <img src="/Showcase.jpg" className="relative bottom-[25vw]" alt="Showcase" />
        </motion.div>
        <motion.div className="col-start-1 row-start-1 grid" style={{ y: imgParallax }}>
          <img
            src="/Showcase.jpg"
            className="relative bottom-[25vw] scale-110 grad-mask blur-xl brightness-150"
            alt="Showcase"
          />
        </motion.div>
        <HeroText className="self-end col-start-1 row-start-2 z-10" sm={sm} scrollYProgress={scrollYProgress} />
      </Card>
    </div>
  );
};

export default Showcase;
