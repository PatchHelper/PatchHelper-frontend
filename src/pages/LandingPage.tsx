import React from "react";

import { 
  Navbar, 
  HeroBanner, 
  Spacer,
  StatBar,
} from "../components";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Navbar />
      <main className="w-full">
        <HeroBanner />

        <Spacer variant={0} />
        <StatBar />
        <Spacer variant={1} />

      </main>
    </div>
  );
};

export default LandingPage;