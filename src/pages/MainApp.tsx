import React from "react";

import { Navbar, PatchList, Footer } from "../components";

const MainApp: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Navbar/>

      <PatchList />

      <Footer />
    </div>
  );
};

export default MainApp;