import React from "react";

import { Navbar, HeroBanner } from "../components";
import { ImageSpacer1, ImageSpacer2 } from "../img";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Navbar />
      <HeroBanner />
    </div>
  );
};

export default LandingPage;