import { cn } from "@/lib/utils";
import React from "react";
import { Pointer } from "../magicui/Pointer";
import { motion } from "motion/react";
import Hyperspeed from "../magicui/HyperSpeed";

interface HeroTextProps extends React.HTMLAttributes<HTMLDivElement> {
  sm: any;
}

const HeroText = (props: HeroTextProps) => {
  const { className, sm, ...rest } = props;
  return (
    <div {...rest} className={cn("space-y-3 pl-4 pb-3", className)}>
      <motion.div className="flex items-center gap-4">
        <p className="md:text-6xl font-semibold text-4xl">Find</p>
        <div
          className="md:w-42 w-20 overflow-hidden rounded-full md:h-16 h-12 grid bg-background cursor-pointer"
          title={"Delibrately used this"}>
          <div className="col-start-1 row-start-1">
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => {},
                onSlowDown: () => {},
                distortion: "turbulentDistortion",
                length: 400,
                roadWidth: 9,
                islandWidth: 2,
                lanesPerRoad: 3,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 50,
                lightPairsPerRoadWay: 50,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [60, 80],
                movingCloserSpeed: [-120, -160],
                carLightsLength: [400 * 0.05, 400 * 0.15],
                carLightsRadius: [0.05, 0.14],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.2, 0.2],
                carFloorSeparation: [0.05, 1],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0x131318,
                  brokenLines: 0x131318,
                  /***  Only these colors can be an array ***/
                  leftCars: [0xdc5b20, 0xdca320, 0xdc2020],
                  rightCars: [0x334bf7, 0xe5e6ed, 0xbfc6f3],
                  sticks: 0xc5e8eb,
                },
              }}
            />
          </div>
        </div>
        <div>
          <p className="md:text-6xl text-4xl font-semibold">Like,</p>
          <Pointer>
            <motion.div
              animate={{
                scale: [0.8, 1.4, 0.8],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-600">
                <motion.path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>
          </Pointer>
        </div>
        <p className="font-semibold md:text-6xl text-4xl">Enjoy.</p>
      </motion.div>
      <div className="mt-0.5 flex items-center gap-1">
        <motion.p style={{ y: sm }} className="text-sm">
          Your Favourite movies - All in One Place !
        </motion.p>
      </div>
    </div>
  );
};

export default HeroText;
