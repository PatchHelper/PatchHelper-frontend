import React from "react";

import { 
  HeroBanner, 
  StatBar,
  About,
  Instructions,
} from "../components";

const LandingPage: React.FC = () => {
  return (
    <main className="w-full flex flex-col gap-y-12">
      <HeroBanner />

      <StatBar />

      <About />

      <Instructions />

    </main>
  );
};

export default LandingPage;