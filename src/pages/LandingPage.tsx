import React from "react";

import { 
  Navbar, 
  HeroBanner, 
  StatBar,
  About,
  Instructions,
  Footer,
} from "../components";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full flex flex-col gap-y-12">
        <HeroBanner />

        <StatBar />

        <About />

        <Instructions />

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;